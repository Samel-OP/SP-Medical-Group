using senai.spMedicalGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spMedicalGroup.webAPI.Interfaces
{
    interface IPacienteRepository
    {
        /// <summary>
        /// Cadastra um novo paciente
        /// </summary>
        /// <param name="novoPaciente">Objeto contendo as informações do novo paciente</param>
        void Cadastrar(Paciente novoPaciente);

        /// <summary>
        /// Lista todos os pacientes
        /// </summary>
        /// <returns>Uma lista de pacientes</returns>
        List<Paciente> ListarTodos();

        /// <summary>
        /// Atualiza um paciente pelo seu id
        /// </summary>
        /// <param name="id">id do médico que será atualizado</param>
        /// <param name="pacienteAtualizado">Objeto contendo as informações do paciente atualizado</param>
        void Atualizar(int id, Paciente pacienteAtualizado);

        /// <summary>
        /// Busca um médico pelo seu id
        /// </summary>
        /// <param name="id">id do paciente que será buscado</param>
        /// <returns>O médico buscado</returns>
        Paciente BuscarPorId(int id);

        /// <summary>
        /// Deleta um médico pelo seu id
        /// </summary>
        /// <param name="id">id do médico que será deletado</param>
        void Deletar(int id);

        /// <summary>
        /// Lista todos as consultas que um determinado paciente participa
        /// </summary>
        /// <param name="idPaciente">id do paciente que poderá ver as consulta listadas</param>
        /// <returns>Uma lista de consultas relacionadas ao paciente</returns>
        List<Consulta> ListarMinhasPaciente(int idPaciente);
    }
}
