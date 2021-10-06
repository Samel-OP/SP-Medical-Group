using senai.spMedicalGroup.webAPI.Context;
using senai.spMedicalGroup.webAPI.Domains;
using senai.spMedicalGroup.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spMedicalGroup.webAPI.Repositories
{
    public class ClinicaRepository : IClinicaRepository
    {
        SpMedicalGroupContext ctx = new SpMedicalGroupContext();

        public void Atualizar(int id, Clinica clinicaAtualizada)
        {
            Clinica clinicaBuscada = BuscarPorId(id);

            if (clinicaAtualizada.NomeFantasia != null)
            {
                clinicaBuscada.NomeFantasia = clinicaAtualizada.NomeFantasia;
                clinicaBuscada.RazaoSocial = clinicaAtualizada.RazaoSocial;
                clinicaBuscada.Cnpj = clinicaAtualizada.Cnpj;
                clinicaBuscada.InicioHorarioFunc = clinicaAtualizada.InicioHorarioFunc;
                clinicaBuscada.FinalHorarioFunc = clinicaAtualizada.FinalHorarioFunc;
                clinicaBuscada.Rua = clinicaAtualizada.Rua;
                clinicaBuscada.Bairro = clinicaAtualizada.Bairro;
                clinicaBuscada.Cidade = clinicaAtualizada.Cidade;
                clinicaBuscada.Estado = clinicaAtualizada.Estado;
                clinicaBuscada.Cep = clinicaAtualizada.Cep;
            }

            ctx.Clinicas.Update(clinicaBuscada);

            ctx.SaveChanges();
        }

        public Clinica BuscarPorId(int id)
        {
            return ctx.Clinicas.FirstOrDefault(e => e.IdClinica == id);
        }

        public void Cadastrar(Clinica novaClinica)
        {
            ctx.Clinicas.Add(novaClinica);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            Clinica clinicaBuscada = BuscarPorId(id);

            ctx.Clinicas.Remove(clinicaBuscada);

            ctx.SaveChanges();
        }

        public List<Clinica> ListarTodos()
        {
            return ctx.Clinicas.ToList();
        }
    }
}
