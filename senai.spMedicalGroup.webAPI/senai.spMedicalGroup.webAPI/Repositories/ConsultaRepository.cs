using Microsoft.EntityFrameworkCore;
using senai.spMedicalGroup.webAPI.Context;
using senai.spMedicalGroup.webAPI.Domains;
using senai.spMedicalGroup.webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spMedicalGroup.webAPI.Repositories
{
    public class ConsultaRepository : IConsultaRepository
    {
        SpMedicalGroupContext ctx = new SpMedicalGroupContext();

        public void AdicionarDescricao(int id, Consulta descricaoAdicionada)
        {
            Consulta consultaBuscada = BuscarPorId(id);

            if (consultaBuscada != null)
            {
                consultaBuscada = ctx.Consulta.FirstOrDefault(p => p.IdConsulta == id);

                consultaBuscada.Descricao = descricaoAdicionada.Descricao;

                ctx.Consulta.Update(consultaBuscada);

                ctx.SaveChanges();
            }                 
        }

        public void Atualizar(int id, Consulta consultaAtualizada)
        {
            Consulta consultaBuscada = BuscarPorId(id);

            if (consultaAtualizada.Descricao != null)
            {
                consultaBuscada.IdPaciente = consultaAtualizada.IdPaciente;
                consultaBuscada.IdMedico = consultaAtualizada.IdMedico;
                consultaBuscada.IdSituacao = consultaAtualizada.IdSituacao;
                consultaBuscada.Descricao = consultaAtualizada.Descricao;
                consultaBuscada.DataConsulta = consultaAtualizada.DataConsulta;
            }

            ctx.Consulta.Update(consultaBuscada);

            ctx.SaveChanges();
        }

        public Consulta BuscarPorId(int id)
        {
            return ctx.Consulta.FirstOrDefault(e => e.IdConsulta == id);
        }

        public void Cadastrar(Consulta novaConsulta)
        {
            ctx.Consulta.Add(novaConsulta);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            Consulta consultaBuscada = BuscarPorId(id);

            ctx.Consulta.Remove(consultaBuscada);

            ctx.SaveChanges();
        }

        public List<Consulta> ListarTodos()
        {
            return ctx.Consulta.ToList();
        }
    }
}
