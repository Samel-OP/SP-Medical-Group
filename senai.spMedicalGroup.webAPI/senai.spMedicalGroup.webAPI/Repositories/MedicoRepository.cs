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
    public class MedicoRepository : IMedicoRepository
    {
        SpMedicalGroupContext ctx = new SpMedicalGroupContext();

        public void Atualizar(int id, Medico medicoAtualizado)
        {
            Medico medicoBuscado = BuscarPorId(id);

            if (medicoAtualizado.NomeMedico != null)
            {
                medicoBuscado.IdClinica = medicoAtualizado.IdClinica;
                medicoBuscado.IdEspecialidade = medicoAtualizado.IdEspecialidade;
                medicoBuscado.Crm = medicoAtualizado.Crm;
                medicoBuscado.NomeMedico = medicoAtualizado.NomeMedico;
            }

            ctx.Medicos.Update(medicoBuscado);

            ctx.SaveChanges();
        }

        public Medico BuscarPorId(int id)
        {
            return ctx.Medicos.FirstOrDefault(e => e.IdUsuario == id);
        }

        public void Cadastrar(Medico novoMedico)
        {
            ctx.Medicos.Add(novoMedico);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            Medico medicoBuscado = BuscarPorId(id);

            ctx.Medicos.Remove(medicoBuscado);

            ctx.SaveChanges();
        }

        public List<Consulta> ListarMinhasMedico(int idUsuario)
        {         
            Medico medico = ctx.Medicos.FirstOrDefault(m => m.IdUsuario == idUsuario);

            return ctx.Consulta.Where(p => p.IdMedico == medico.IdMedico).Select(e =>
                new Consulta
                {
                    IdConsulta = e.IdConsulta,
                    IdMedico = e.IdMedico,
                    IdPaciente = e.IdPaciente,
                    IdSituacao = e.IdSituacao,
                    DataConsulta = e.DataConsulta,
                    Descricao = e.Descricao,
                }).ToList();                               
        }

        public List<Medico> ListarTodos()
        {
            return ctx.Medicos.ToList();
        }
    }
}
