using System;
using System.Text;
// Exemplo de uso
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("CPF Gerado: " + GeradorDocumento.GerarCPF());
        Console.WriteLine("CNPJ Gerado: " + GeradorDocumento.GerarCNPJ());
    }
}

public class GeradorDocumento
{
    // Gera um CPF válido
    public static string GerarCPF()
    {
        Random rnd = new Random();
        StringBuilder cpf = new StringBuilder();

        // Gera os 9 primeiros dígitos aleatórios
        for (int i = 0; i < 9; i++)
        {
            cpf.Append(rnd.Next(0, 10));
        }

        // Calcula o dígito verificador do CPF
        cpf.Append(CalcularDigitoCPF(cpf.ToString()));
        cpf.Append(CalcularDigitoCPF(cpf.ToString()));

        return cpf.ToString();
    }

    // Gera um CNPJ alfanumérico válido (formato 2026+)
    public static string GerarCNPJ()
    {
        const string chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        Random rnd = new Random();
        StringBuilder cnpj = new StringBuilder();

        // Gera os 12 primeiros caracteres alfanuméricos
        for (int i = 0; i < 12; i++)
        {
            cnpj.Append(chars[rnd.Next(chars.Length)]);
        }

        // Calcula o primeiro dígito verificador
        int[] pesos1 = { 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
        int soma = 0;
        for (int i = 0; i < 12; i++)
        {
            int valor = cnpj[i] - '0';
            soma += valor * pesos1[i];
        }
        int resto = soma % 11;
        int dv1 = resto < 2 ? 0 : 11 - resto;
        cnpj.Append(dv1);

        // Calcula o segundo dígito verificador
        int[] pesos2 = { 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
        soma = 0;
        for (int i = 0; i < 13; i++)
        {
            int valor = cnpj[i] - '0';
            soma += valor * pesos2[i];
        }
        resto = soma % 11;
        int dv2 = resto < 2 ? 0 : 11 - resto;
        cnpj.Append(dv2);

        return cnpj.ToString();
    }

    private static int CalcularDigitoCPF(string cpf)
    {
        int soma = 0;
        int peso = cpf.Length + 1;

        for (int i = 0; i < cpf.Length; i++)
        {
            soma += int.Parse(cpf[i].ToString()) * peso--;
        }

        int resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }

    private static int CalcularDigitoCNPJ(string cnpj)
    {
        int[] pesos = { 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
        int soma = 0;

        for (int i = cnpj.Length - 1; i >= 0; i--)
        {
            soma += int.Parse(cnpj[i].ToString()) * pesos[pesos.Length - cnpj.Length + i];
        }

        int resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    }
}

