using System;
using System.Collections.Generic;

#nullable disable

namespace senai.spMedicalGroup.webAPI.Domains
{
    public partial class Clinica
    {
        public Clinica()
        {
            Medicos = new HashSet<Medico>();
        }

        public short IdClinica { get; set; }
        public string NomeFantasia { get; set; }
        public string RazaoSocial { get; set; }
        public string Cnpj { get; set; }
        public TimeSpan InicioHorarioFunc { get; set; }
        public TimeSpan FinalHorarioFunc { get; set; }
        public string Rua { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Cep { get; set; }

        public virtual ICollection<Medico> Medicos { get; set; }
    }
}
