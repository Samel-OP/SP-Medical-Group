USE SP_MED_GROUP;
GO

INSERT INTO tipoUsuario (nomeTipoUsuario)
VALUES ('ADMINISTRADOR'),
	   ('MÉDICO'),
	   ('PACIENTE');
GO

INSERT INTO situacao (nomeSituacao)
VALUES ('Realizada'),
	   ('Cancelada'),
	   ('Agendada');
GO

INSERT INTO especialidade (nomeEspecialidade)
VALUES ('Acupuntura'),
       ('Anestesiologia'),
	   ('Angiologia'),
	   ('Cardiologia'),
	   ('Cirurgia Cardiovascular'),
	   ('Cirurgia da Mão'),
	   ('Cirurgia do Aparelho Digestivo'),
	   ('Cirurgia Geral'),
	   ('Cirurgia Pediátrica'),
	   ('Cirurgia Plástica'),
	   ('Cirurgia Torácica'),
	   ('Cirurgia Vascular'),
	   ('Dermatologia'),
	   ('Radioterapia'),
	   ('Urologia'),
	   ('Pediatria'),
	   ('Psiquiatria');
GO

INSERT INTO clinica (nomeFantasia,razaoSocial,CNPJ,inicioHorarioFunc,finalHorarioFunc,rua,bairro,cidade,estado,CEP)
VALUES ('SENAI Medical Center SP','SP Medical Group','86400902000130','07:00','22:00','Av. Barão Limeira, 532','Santa Cecília','São Paulo','SP','01202001');
GO

INSERT INTO usuario (idTipoUsuario, nomeUsuario, email, senha)
VALUES (3,'Ligia','ligia@gmail.com','ligia121'),
       (3,'Alexandre','alexandre@gmail.com','alex1234'),
	   (3,'Fernando','fernando@gmail.com','fern1223'),
	   (3,'Henrique','henrique@gmail.com','henr1234'),
	   (3,'João','joao@hotmail.com','joao1245'),
	   (3,'Bruno','bruno@gmail.com','brun1234'),
	   (3,'Mariana','mariana@outlook.com','mari1234'),
	   (2,'Ricardo Lemos','ricardo.lemos@spmedicalgroup.com.br','rica1223'),
	   (2,'Roberto Possarle','roberto.possarle@spmedicalgroup.com.br','robe1223'),
	   (2,'Helena Strada','helena.souza@spmedicalgroup.com.br','hele1223'),
	   (1,'ADM','Adm@adm.com','Adm12145');
GO

INSERT INTO medico (idClinica,idEspecialidade,idUsuario,crm,nomeMedico)
VALUES (1,2,8,'54356SP','Ricardo Lemos'),
	   (1,17,9,'53452SP','Roberto Possarle'),
	   (1,16,10,'65463SP','Helena Strada');
GO

INSERT INTO paciente (idUsuario,nomePaciente,dataNascimento,telefone,RG,CPF,rua,bairro,cidade,estado,CEP)
VALUES (3,'Ligia','1983-10-13','1134567654','435225435','94839859000','Rua Estado de Israel 240','Vila Mariana','São Paulo','SP','04022000'),
       (4,'Alexandre','2001-7-23','11987656543','326543457','73556944057','Av. Paulista, 1578','Bela Vista','São Paulo','SP','01310200'),
	   (5,'Fernando','1978-10-10','11972084453','546365253','16839338002','Av. Ibirapuera, 2927','Indianópolis','São Paulo','SP','04029200'),
	   (6,'Henrique','1985-10-13','1134566543','543663625','14332654765','R. Vitória, 120','Vila Sao Jorge, Barueri','São Paulo','SP','06402030'),
	   (7,'João','1975-8-27','1176566377','532544441','91305348010','R. Ver. Geraldo de Camargo, 66','Santa Luzia','Ribeirão Pires','SP','09405380'),(8,'Bruno','1972-3-21','11954368769','545662667','79799299004','Alameda dos Arapanés, 945','Indianópolis','São Paulo','SP','04524001'),(9,'Mariana','2018-03-05',NULL,'545662668','13771913039','R Sao Antonio, 232','Vila Universal, Barueri','São Paulo','SP','06407140');
GO

INSERT INTO consulta (idPaciente,idMedico,idSituacao,dataConsulta,descricao)
VALUES (7,7,1,'20/01/2020 15:00','Paciente está bem'),
	   (2,6,2,'06/01/2020 10:00','Tudo correu bem'),
	   (3,6,1,'07/02/2020 11:00','Foi conversado sobre o problema mas está bem'),
	   (2,6,1,'06/02/2018 10:00','Paciente está bem'),
	   (4,5,2,'07/02/2019 11:00','Foi aplicado anestesia para realizar procedimento'),
	   (7,7,3,'08/03/2020 15:00','Ainda não ocorreu'),
	   (4,5,3,'09/03/2020 11:00','Ainda não ocorreu');
GO
