export interface User {
  id: string;
  name: string;
  email: string;
}

// Exemplo de simulação de Model
export const UserModel = {
  findAll: async (): Promise<User[]> => {
    return [{ id: '1', name: 'Usuário Teste', email: 'teste@email.com' }];
  }
};