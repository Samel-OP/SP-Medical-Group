using senai.spMedicalGroup.webAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spMedicalGroup.webAPI.Interfaces
{
    interface IConsultaRepository
    {
        /// <summary>
        /// Cadastra uma nova consulta
        /// </summary>
        /// <param name="novaConsulta">Objeto contendo as informações da nova consulta</param>
        void Cadastrar(Consulta novaConsulta);

        /// <summary>
        /// Lista todas as consultas
        /// </summary>
        /// <returns>Uma lista de consultas</returns>
        List<Consulta> ListarTodos();

        /// <summary>
        /// Atualiza a consulta pelo seu id
        /// </summary>
        /// <param name="id">id da consulta que será atualizada</param>
        /// <param name="consultaAtualizada">Objeto contendo as informações da consulta atualizada</param>
        void Atualizar(int id, Consulta consultaAtualizada);

        /// <summary>
        /// Busca uma consulta pelo seu id
        /// </summary>
        /// <param name="id">id da consulta que será buscada</param>
        /// <returns>A consulta buscada</returns>
        Consulta BuscarPorId(int id);

        /// <summary>
        /// Deleta uma consulta pelo seu id
        /// </summary>
        /// <param name="id">id da consulta que será deletada</param>
        void Deletar(int id);

        /// <summary>
        /// Adiciona uma descrição a consulta
        /// </summary>
        /// <param name="id">id da consulta que será adicionado a descrição</param>
        /// <param name="descricaoAdicionada">Objeto contendo as informações da descrição</param>
        void AdicionarDescricao(int id, Consulta descricaoAdicionada);
    }
}
