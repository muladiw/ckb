/*
 Navicat Premium Data Transfer

 Source Server         : local sql server sql auth
 Source Server Type    : SQL Server
 Source Server Version : 16001000
 Source Host           : LAPTOP-A8JB02O5:1433
 Source Catalog        : forum
 Source Schema         : dbo

 Target Server Type    : SQL Server
 Target Server Version : 16001000
 File Encoding         : 65001

 Date: 28/11/2023 20:04:28
*/


-- ----------------------------
-- Table structure for mahasiswa
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[mahasiswa]') AND type IN ('U'))
	DROP TABLE [dbo].[mahasiswa]
GO

CREATE TABLE [dbo].[mahasiswa] (
  [nim] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [nama_mahasiswa] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [jurusan] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL
)
GO

ALTER TABLE [dbo].[mahasiswa] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Table structure for mata_kuliah
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[mata_kuliah]') AND type IN ('U'))
	DROP TABLE [dbo].[mata_kuliah]
GO

CREATE TABLE [dbo].[mata_kuliah] (
  [kode_mata_kuliah] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [nama_mata_kuliah] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [sks] int  NOT NULL
)
GO

ALTER TABLE [dbo].[mata_kuliah] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Table structure for nilai_mahasiswa
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[nilai_mahasiswa]') AND type IN ('U'))
	DROP TABLE [dbo].[nilai_mahasiswa]
GO

CREATE TABLE [dbo].[nilai_mahasiswa] (
  [nim] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [kode_mata_kuliah] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [uts] int  NOT NULL,
  [tugas] int  NOT NULL,
  [uas] int  NOT NULL,
  [id] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT (newid()) NOT NULL,
  [nilai_akhir] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL
)
GO

ALTER TABLE [dbo].[nilai_mahasiswa] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Table structure for threads
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[threads]') AND type IN ('U'))
	DROP TABLE [dbo].[threads]
GO

CREATE TABLE [dbo].[threads] (
  [id] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT (newid()) NOT NULL,
  [title] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [body] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL
)
GO

ALTER TABLE [dbo].[threads] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Table structure for users
-- ----------------------------
IF EXISTS (SELECT * FROM sys.all_objects WHERE object_id = OBJECT_ID(N'[dbo].[users]') AND type IN ('U'))
	DROP TABLE [dbo].[users]
GO

CREATE TABLE [dbo].[users] (
  [id] bigint  IDENTITY(1,1) NOT NULL,
  [nama] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NOT NULL,
  [alamat] text COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [no_telepon] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [jenis_kelamin] varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS  NULL,
  [created_at] datetime2(7)  NULL
)
GO

ALTER TABLE [dbo].[users] SET (LOCK_ESCALATION = TABLE)
GO


-- ----------------------------
-- Primary Key structure for table mahasiswa
-- ----------------------------
ALTER TABLE [dbo].[mahasiswa] ADD CONSTRAINT [PK__mahasisw__DF97D0EA817556EC] PRIMARY KEY CLUSTERED ([nim])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table mata_kuliah
-- ----------------------------
ALTER TABLE [dbo].[mata_kuliah] ADD CONSTRAINT [PK__mata_kul__3213E83F73326073] PRIMARY KEY CLUSTERED ([kode_mata_kuliah])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table nilai_mahasiswa
-- ----------------------------
ALTER TABLE [dbo].[nilai_mahasiswa] ADD CONSTRAINT [PK__nilai_ma__72A8A7B1FD673A6E] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table threads
-- ----------------------------
ALTER TABLE [dbo].[threads] ADD CONSTRAINT [PK__threads__3213E83F079E03E4] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Auto increment value for users
-- ----------------------------
DBCC CHECKIDENT ('[dbo].[users]', RESEED, 18)
GO


-- ----------------------------
-- Uniques structure for table users
-- ----------------------------
ALTER TABLE [dbo].[users] ADD CONSTRAINT [unique_nama] UNIQUE NONCLUSTERED ([nama] ASC)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO


-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE [dbo].[users] ADD CONSTRAINT [PK__users__3213E83F4A58BA1E] PRIMARY KEY CLUSTERED ([id])
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)  
ON [PRIMARY]
GO

