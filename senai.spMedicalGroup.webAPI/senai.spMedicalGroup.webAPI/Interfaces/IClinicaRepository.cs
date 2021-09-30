using senai.spMedicalGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spMedicalGroup.webAPI.Interfaces
{
    interface IClinicaRepository
    {
        /// <summary>
        /// Cadastra uma nova clínica
        /// </summary>
        /// <param name="novaClinica">Objeto contendo as informações da nova clínica</param>
        void Cadastrar(Clinica novaClinica);

        /// <summary>
        /// Lista todas as clínicas
        /// </summary>
        /// <returns></returns>
        List<Clinica> ListarTodos();

        /// <summary>
        /// Atualiza a clínica pelo seu id
        /// </summary>
        /// <param name="id">id da clínica que será atualizada</param>
        /// <param name="clinicaAtualizada">Objeto contendo as informações da clínica atualizada</param>
        void Atualizar(int id, Clinica clinicaAtualizada);

        /// <summary>
        /// Busca uma clínica pelo seu id
        /// </summary>
        /// <param name="id">id da clínica que será buscada</param>
        /// <returns>A clínica buscada</returns>
        Clinica BuscarPorId(int id);

        /// <summary>
        /// Deleta uma clínica
        /// </summary>
        /// <param name="id">id da clínica que será deletada</param>
        void Deletar(int id);
    }
}
