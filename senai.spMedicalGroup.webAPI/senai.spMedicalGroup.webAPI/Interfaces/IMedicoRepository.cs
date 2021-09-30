using senai.spMedicalGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spMedicalGroup.webAPI.Interfaces
{
    interface IMedicoRepository
    {
        /// <summary>
        /// Cadastrar um novo médico
        /// </summary>
        /// <param name="novoMedico">Objeto contendo as informações do novo médico</param>
        void Cadastrar(Medico novoMedico);

        /// <summary>
        /// Lista todos os médicos
        /// </summary>
        /// <returns>Uma lista de médicos</returns>
        List<Medico> ListarTodos();

        /// <summary>
        /// Atualiza um médico pelo seu id
        /// </summary>
        /// <param name="id">id do médico que será atualizado</param>
        /// <param name="medicoAtualizado">Objeto contendo as informações do médico atualizado</param>
        void Atualizar(int id, Medico medicoAtualizado);

        /// <summary>
        /// Busca um médico pelo id
        /// </summary>
        /// <param name="id">id do médico que será buscado</param>
        /// <returns>O médico buscado</returns>
        Medico BuscarPorId(int id);

        /// <summary>
        /// Deleta um médico pelo seu id
        /// </summary>
        /// <param name="id">id do médico que será deletado</param>
        void Deletar(int id);

        /// <summary>
        /// Lista todos as consultas que um determinado médico participa
        /// </summary>
        /// <param name="idMedico">id do médico que poderá ver as consulta listadas</param>
        /// <returns>Uma lista de consultas relacionadas ao médico</returns>
        List<Consulta> ListarMinhasMedico(int idMedico);
    }
}
