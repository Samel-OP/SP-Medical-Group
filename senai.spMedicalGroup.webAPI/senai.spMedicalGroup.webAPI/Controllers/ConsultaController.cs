using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai.spMedicalGroup.webAPI.Domains;
using senai.spMedicalGroup.webAPI.Interfaces;
using senai.spMedicalGroup.webAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.spMedicalGroup.webAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]

    [Authorize]
    public class ConsultaController : ControllerBase
    {
        private IConsultaRepository _consultaRepository { get; set; }

        public ConsultaController()
        {
            _consultaRepository = new ConsultaRepository();
        }

        /// <summary>
        /// Lista todas as consultas
        /// </summary>
        /// <returns>Uma lista de consultas</returns>
        [HttpGet]
        public IActionResult ListarTodos()
        {
            try
            {
                return Ok(_consultaRepository.ListarTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Cadastra uma nova consulta
        /// </summary>
        /// <param name="novaConsulta">Objeto com as informações da nova consulta</param>
        /// <returns></returns>
        [Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Cadastrar(Consulta novaConsulta)
        {
            try
            {
                _consultaRepository.Cadastrar(novaConsulta);

                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Deleta uma consulta existente
        /// </summary>
        /// <param name="id">id da consulta que será deletada</param>
        /// <returns>Um status code 204 - No Content</returns>
        [Authorize(Roles = "1")]
        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            Consulta consultaBuscada = _consultaRepository.BuscarPorId(id);

            if (consultaBuscada != null)
            {
                try
                {
                    _consultaRepository.Deletar(id);
                    return NoContent();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex);
                }
            }

            return NotFound("Id não encontrado ou o campo está vazio!");
        }

        /// <summary>
        /// Adiciona uma descrição a consulta
        /// </summary>
        /// <param name="id">id da consulta que será adicionada a descrição</param>
        /// <param name="descricaoAdicionada">Objeto contendo as informações da descrição</param>
        /// <returns>Um status code 200 - Ok</returns>
        [Authorize(Roles = "2")]
        [HttpPatch("{id}")]
        public IActionResult AdicionarDescricao(int id, Consulta descricaoAdicionada)
        {
            Consulta consultaBuscada = _consultaRepository.BuscarPorId(id);

            if (descricaoAdicionada.Descricao != null)
            {
                try
                {
                    _consultaRepository.AdicionarDescricao(id, descricaoAdicionada);

                    return StatusCode(200);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex);
                }             
            }

            return NotFound("Id não encontrado ou o campo está vazio!");
        }
    }
}
