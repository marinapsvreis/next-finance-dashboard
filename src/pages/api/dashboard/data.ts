import { NextApiRequest, NextApiResponse } from "next";
import AuthService from "@/services/auth-token";
import transactions from "./transactions.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const token = req.query.token as string | undefined;
  const { startDate, endDate } = req.query;

  try {
    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const decodedToken = await AuthService.openSessionToken(token);

    if (!decodedToken) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const transactionsArray = transactions.data;

    const filterTransactions = (itens) => {
      return itens.filter((item) => {
        const itemDate = new Date(item.date);
        const isWithinDateRange =
          (!startDate || itemDate >= new Date(startDate as string)) &&
          (!endDate || itemDate <= new Date(endDate as string));
        return isWithinDateRange;
      });
    };

    const filteredTransactions = filterTransactions(transactionsArray);

    const converterValoresEDatas = (itens) => {
      return itens.map((item) => ({
        ...item,
        amount: (parseFloat(item.amount) / 100).toFixed(2),
        date: new Date(item.date).toLocaleDateString(),
      }));
    };

    const transacoesConvertidas = converterValoresEDatas(filteredTransactions);

    const agruparPorFiltros = (itens) => {
      return itens.reduce((agrupado, item) => {
        const { date, industry, transaction_type } = item;

        const itemDate = new Date(date);
        const month = itemDate.getMonth() + 1; // meses são base 0, então adicionamos 1
        const year = itemDate.getFullYear();
        const key = `${month.toString().padStart(2, '0')}/${year}`;

        if (!agrupado[key]) {
          agrupado[key] = {};
        }

        if (!agrupado[key][industry]) {
          agrupado[key][industry] = {
            totalReceitas: 0,
            totalDespesas: 0,
          };
        }

        const amount = parseFloat(item.amount);

        if (transaction_type === 'deposit') {
          agrupado[key][industry].totalReceitas += amount;
        } else if (transaction_type === 'withdraw') {
          agrupado[key][industry].totalDespesas += amount;
        }

        return agrupado;
      }, {});
    };

    const transacoesAgrupadas = agruparPorFiltros(transacoesConvertidas);

    // Ordenar as chaves por data
    const chavesOrdenadas = Object.keys(transacoesAgrupadas).sort(
      (chaveA, chaveB) => {
        const [mesA, anoA] = chaveA.split('/').map(Number);
        const [mesB, anoB] = chaveB.split('/').map(Number);

        // Ordene primeiro pelo ano e, em seguida, pelo mês
        if (anoA !== anoB) {
          return anoA - anoB;
        }
        return mesA - mesB;
      }
    );

    // Criar o objeto final ordenado
    const transacoesOrdenadas = {};
    chavesOrdenadas.forEach((chave) => {
      transacoesOrdenadas[chave] = transacoesAgrupadas[chave];
    });

    return res.status(200).json({
      message: "Dados do usuário",
      agrupadoPorFiltros: transacoesOrdenadas,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ error: 'Internal server error' });
  }
}
