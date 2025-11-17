import mongoose from 'mongoose'

export default class MongooseSingleton {
  // Variável estática para guardar a conexão
  private static instance: typeof mongoose

  // O método que todo mundo vai chamar para pegar a conexão
  public static async getInstance(): Promise<typeof mongoose> {
    if (this.instance) {
      return this.instance
    }
    try {
      // Tenta pegar do arquivo .env, se não achar, avisa no console
      const uri = process.env.MONGODB_URI || process.env.DATABASE_URL

      if (!uri) {
        throw new Error('ERRO CRÍTICO: A URL do Mongo não foi encontrada no .env')
      }

      // Conecta no banco
      this.instance = await mongoose.connect(uri)

      console.log('✅ Conexão com MongoDB (Mongoose) estabelecida com sucesso!')
      return this.instance
    } catch (error) {
      console.error('❌ Erro ao conectar no MongoDB:', error)
      throw error
    }
  }
}
