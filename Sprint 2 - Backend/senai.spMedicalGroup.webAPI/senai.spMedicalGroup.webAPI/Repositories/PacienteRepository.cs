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
    public class PacienteRepository : IPacienteRepository
    {
        SpMedicalGroupContext ctx = new SpMedicalGroupContext();

        public void Atualizar(int id, Paciente pacienteAtualizado)
        {
            Paciente pacienteBuscado = BuscarPorId(id);

            if (pacienteAtualizado.NomePaciente != null)
            {
                pacienteBuscado.NomePaciente = pacienteAtualizado.NomePaciente;
                pacienteBuscado.DataNascimento = pacienteAtualizado.DataNascimento;
                pacienteBuscado.Telefone = pacienteAtualizado.Telefone;
                pacienteBuscado.Rg = pacienteAtualizado.Rg;
                pacienteBuscado.Cpf = pacienteAtualizado.Cpf;
                pacienteBuscado.Rua = pacienteAtualizado.Rua;
                pacienteBuscado.Bairro = pacienteAtualizado.Bairro;
                pacienteBuscado.Cidade = pacienteAtualizado.Cidade;
                pacienteBuscado.Estado = pacienteAtualizado.Estado;
                pacienteBuscado.Cep = pacienteAtualizado.Cep;
            }

            ctx.Pacientes.Update(pacienteBuscado);

            ctx.SaveChanges();
        }

        public Paciente BuscarPorId(int id)
        {
            return ctx.Pacientes.FirstOrDefault(e => e.IdUsuario == id);
        }

        public void Cadastrar(Paciente novoPaciente)
        {
            ctx.Pacientes.Add(novoPaciente);

            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            Paciente pacienteBuscado = BuscarPorId(id);

            ctx.Pacientes.Remove(pacienteBuscado);

            ctx.SaveChanges();
        }

        public List<Consulta> ListarMinhasPaciente(int idUsuario)
        {
            Paciente paciente = ctx.Pacientes.FirstOrDefault(c => c.IdUsuario == idUsuario);

            return ctx.Consulta.Where(p => p.IdPaciente == paciente.IdPaciente).Select(e =>
               new Consulta
               {
                   IdConsulta = e.IdConsulta,
                   IdMedico = e.IdMedico,
                   IdPaciente = e.IdPaciente,
                   IdSituacao = e.IdSituacao,
                   DataConsulta = e.DataConsulta,
                   Descricao = e.Descricao,
                   IdMedicoNavigation = new Medico()
                   {
                       Crm = e.IdMedicoNavigation.Crm,
                       IdUsuarioNavigation = new Usuario()
                       {
                           NomeUsuario = e.IdMedicoNavigation.IdUsuarioNavigation.NomeUsuario,
                           Email = e.IdMedicoNavigation.IdUsuarioNavigation.Email
                       }
                   },
                   IdPacienteNavigation = new Paciente()
                   {
                       Cpf = e.IdPacienteNavigation.Cpf,
                       Telefone = e.IdPacienteNavigation.Telefone,
                       IdUsuarioNavigation = new Usuario()
                       {
                           NomeUsuario = e.IdPacienteNavigation.IdUsuarioNavigation.NomeUsuario,
                           Email = e.IdPacienteNavigation.IdUsuarioNavigation.Email
                       }
                   },
                   IdSituacaoNavigation = new Situacao()
                   {
                       NomeSituacao = e.IdSituacaoNavigation.NomeSituacao
                   }
               }).ToList();
        }

        public List<Paciente> ListarTodos()
        {
            return ctx.Pacientes.Include(p => p.IdUsuarioNavigation).ToList();
        }
    }
}
