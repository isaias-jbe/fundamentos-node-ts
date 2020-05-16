import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private balance: Balance = { income: 0, outcome: 0, total: 0 };

  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (acumulator, transaction: Transaction) => {
        transaction.type === 'income'
          ? (acumulator.income += transaction.value)
          : (acumulator.outcome += transaction.value);

        return acumulator;
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    const total = income - outcome;

    this.balance = { income, outcome, total };

    return this.balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
