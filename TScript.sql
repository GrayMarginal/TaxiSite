USE [master]
GO
/****** Object:  Database [Taxi]    Script Date: 05/22/2018 07:37:23 ******/
CREATE DATABASE [Taxi] ON  PRIMARY 
( NAME = N'Taxi', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL\DATA\Taxi.mdf' , SIZE = 3072KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'Taxi_log', FILENAME = N'C:\Program Files (x86)\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL\DATA\Taxi_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [Taxi] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Taxi].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Taxi] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [Taxi] SET ANSI_NULLS OFF
GO
ALTER DATABASE [Taxi] SET ANSI_PADDING OFF
GO
ALTER DATABASE [Taxi] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [Taxi] SET ARITHABORT OFF
GO
ALTER DATABASE [Taxi] SET AUTO_CLOSE OFF
GO
ALTER DATABASE [Taxi] SET AUTO_CREATE_STATISTICS ON
GO
ALTER DATABASE [Taxi] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [Taxi] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [Taxi] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [Taxi] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE [Taxi] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [Taxi] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [Taxi] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [Taxi] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [Taxi] SET  DISABLE_BROKER
GO
ALTER DATABASE [Taxi] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [Taxi] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [Taxi] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [Taxi] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [Taxi] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [Taxi] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [Taxi] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [Taxi] SET  READ_WRITE
GO
ALTER DATABASE [Taxi] SET RECOVERY FULL
GO
ALTER DATABASE [Taxi] SET  MULTI_USER
GO
ALTER DATABASE [Taxi] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [Taxi] SET DB_CHAINING OFF
GO
EXEC sys.sp_db_vardecimal_storage_format N'Taxi', N'ON'
GO
USE [Taxi]
GO
/****** Object:  Table [dbo].[Add_Services]    Script Date: 05/22/2018 07:37:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Add_Services](
	[ID_Add_Service] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Price] [int] NOT NULL,
 CONSTRAINT [PK_Add_Services] PRIMARY KEY CLUSTERED 
(
	[ID_Add_Service] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
 CONSTRAINT [UQ_Service] UNIQUE NONCLUSTERED 
(
	[Name] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Rates]    Script Date: 05/22/2018 07:37:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Rates](
	[ID_Rate] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NOT NULL,
	[Min_Price] [int] NOT NULL,
	[Km_Price] [int] NOT NULL,
	[Wait_Min_Price] [int] NOT NULL,
 CONSTRAINT [PK_Rates] PRIMARY KEY CLUSTERED 
(
	[ID_Rate] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
 CONSTRAINT [UQ_Rate] UNIQUE NONCLUSTERED 
(
	[Name] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Dispatchers]    Script Date: 05/22/2018 07:37:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Dispatchers](
	[ID_Dispatcher] [int] IDENTITY(1,1) NOT NULL,
	[LastName] [varchar](25) NOT NULL,
	[FirstName] [varchar](25) NOT NULL,
	[Login] [varchar](25) NOT NULL,
	[Password] [varchar](25) NOT NULL,
 CONSTRAINT [PK_Dispatchers] PRIMARY KEY CLUSTERED 
(
	[ID_Dispatcher] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
 CONSTRAINT [UQ_Login] UNIQUE NONCLUSTERED 
(
	[Login] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Clients]    Script Date: 05/22/2018 07:37:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Clients](
	[Phone_Number] [varchar](16) NOT NULL,
	[Password] [varchar](25) NULL,
	[Discount] [int] NOT NULL,
	[Bank_Card] [varchar](16) NULL,
	[CVC] [varchar](3) NULL,
 CONSTRAINT [PK_Clients] PRIMARY KEY CLUSTERED 
(
	[Phone_Number] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Client_Addresses]    Script Date: 05/22/2018 07:37:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Client_Addresses](
	[Id_Client_Address] [int] IDENTITY(1,1) NOT NULL,
	[Client_Phone] [varchar](16) NOT NULL,
	[Address] [varchar](50) NOT NULL,
	[Name] [varchar](255) NOT NULL,
 CONSTRAINT [PK_Client_Addresses] PRIMARY KEY CLUSTERED 
(
	[Id_Client_Address] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Drivers]    Script Date: 05/22/2018 07:37:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Drivers](
	[ID_Driver] [int] IDENTITY(1,1) NOT NULL,
	[LastName] [varchar](25) NOT NULL,
	[FirstName] [varchar](25) NOT NULL,
	[Patronymic] [varchar](25) NULL,
	[Phone_Number] [varchar](16) NOT NULL,
	[Password] [varchar](25) NOT NULL,
	[Car_Number] [varchar](6) NOT NULL,
	[Car_Description] [varchar](255) NOT NULL,
	[Status] [varchar](25) NOT NULL,
	[Coordinates] [varchar](255) NULL,
	[ID_Rate] [int] NOT NULL,
 CONSTRAINT [PK_Drivers] PRIMARY KEY CLUSTERED 
(
	[ID_Driver] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
 CONSTRAINT [UQ_Driver_Car] UNIQUE NONCLUSTERED 
(
	[Car_Number] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
 CONSTRAINT [UQ_Driver_Phone] UNIQUE NONCLUSTERED 
(
	[Phone_Number] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Driver_Add_Services]    Script Date: 05/22/2018 07:37:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Driver_Add_Services](
	[ID_Driver_Add_Service] [int] IDENTITY(1,1) NOT NULL,
	[ID_Add_Service] [int] NOT NULL,
	[ID_Driver] [int] NOT NULL,
 CONSTRAINT [PK_Driver_Add_Services] PRIMARY KEY CLUSTERED 
(
	[ID_Driver_Add_Service] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 05/22/2018 07:37:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Orders](
	[ID_Order] [int] IDENTITY(1,1) NOT NULL,
	[Client_Phone] [varchar](16) NOT NULL,
	[ID_Driver] [int] NULL,
	[ID_Rate] [int] NOT NULL,
	[From_Address] [varchar](50) NOT NULL,
	[Entrance] [int] NULL,
	[To_Address] [varchar](50) NOT NULL,
	[Arrival_Time] [datetime] NOT NULL,
	[Distance] [float] NOT NULL,
	[Waiting] [int] NULL,
	[Price] [int] NOT NULL,
	[Payment_Type] [bit] NOT NULL,
	[State] [varchar](25) NOT NULL,
	[Paid] [bit] NOT NULL,
	[Mark] [int] NULL,
	[ID_Dispatcher] [int] NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[ID_Order] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Order_Add_Services]    Script Date: 05/22/2018 07:37:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order_Add_Services](
	[ID_Order_Add_Service] [int] IDENTITY(1,1) NOT NULL,
	[ID_Add_Service] [int] NOT NULL,
	[ID_Order] [int] NOT NULL,
 CONSTRAINT [PK_Order_Add_Services] PRIMARY KEY CLUSTERED 
(
	[ID_Order_Add_Service] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Inter_Addresses]    Script Date: 05/22/2018 07:37:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Inter_Addresses](
	[ID_Inter_Address] [int] IDENTITY(1,1) NOT NULL,
	[ID_Order] [int] NOT NULL,
	[Address] [varchar](50) NOT NULL,
	[Number] [int] NOT NULL,
 CONSTRAINT [PK_Inter_Addresses] PRIMARY KEY CLUSTERED 
(
	[ID_Inter_Address] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  ForeignKey [FK_Client_Addresses_Clients]    Script Date: 05/22/2018 07:37:24 ******/
ALTER TABLE [dbo].[Client_Addresses]  WITH CHECK ADD  CONSTRAINT [FK_Client_Addresses_Clients] FOREIGN KEY([Client_Phone])
REFERENCES [dbo].[Clients] ([Phone_Number])
GO
ALTER TABLE [dbo].[Client_Addresses] CHECK CONSTRAINT [FK_Client_Addresses_Clients]
GO
/****** Object:  ForeignKey [FK_Drivers_Rates]    Script Date: 05/22/2018 07:37:24 ******/
ALTER TABLE [dbo].[Drivers]  WITH CHECK ADD  CONSTRAINT [FK_Drivers_Rates] FOREIGN KEY([ID_Rate])
REFERENCES [dbo].[Rates] ([ID_Rate])
GO
ALTER TABLE [dbo].[Drivers] CHECK CONSTRAINT [FK_Drivers_Rates]
GO
/****** Object:  ForeignKey [FK_Driver_Add_Services_Add_Services]    Script Date: 05/22/2018 07:37:24 ******/
ALTER TABLE [dbo].[Driver_Add_Services]  WITH CHECK ADD  CONSTRAINT [FK_Driver_Add_Services_Add_Services] FOREIGN KEY([ID_Add_Service])
REFERENCES [dbo].[Add_Services] ([ID_Add_Service])
GO
ALTER TABLE [dbo].[Driver_Add_Services] CHECK CONSTRAINT [FK_Driver_Add_Services_Add_Services]
GO
/****** Object:  ForeignKey [FK_Driver_Add_Services_Drivers]    Script Date: 05/22/2018 07:37:24 ******/
ALTER TABLE [dbo].[Driver_Add_Services]  WITH CHECK ADD  CONSTRAINT [FK_Driver_Add_Services_Drivers] FOREIGN KEY([ID_Driver])
REFERENCES [dbo].[Drivers] ([ID_Driver])
GO
ALTER TABLE [dbo].[Driver_Add_Services] CHECK CONSTRAINT [FK_Driver_Add_Services_Drivers]
GO
/****** Object:  ForeignKey [FK_Orders_Clients]    Script Date: 05/22/2018 07:37:24 ******/
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Clients] FOREIGN KEY([Client_Phone])
REFERENCES [dbo].[Clients] ([Phone_Number])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Clients]
GO
/****** Object:  ForeignKey [FK_Orders_Dispatchers]    Script Date: 05/22/2018 07:37:24 ******/
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Dispatchers] FOREIGN KEY([ID_Dispatcher])
REFERENCES [dbo].[Dispatchers] ([ID_Dispatcher])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Dispatchers]
GO
/****** Object:  ForeignKey [FK_Orders_Drivers]    Script Date: 05/22/2018 07:37:24 ******/
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Drivers] FOREIGN KEY([ID_Driver])
REFERENCES [dbo].[Drivers] ([ID_Driver])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Drivers]
GO
/****** Object:  ForeignKey [FK_Orders_Rates]    Script Date: 05/22/2018 07:37:24 ******/
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Rates] FOREIGN KEY([ID_Rate])
REFERENCES [dbo].[Rates] ([ID_Rate])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Rates]
GO
/****** Object:  ForeignKey [FK_Order_Add_Services_Add_Services]    Script Date: 05/22/2018 07:37:24 ******/
ALTER TABLE [dbo].[Order_Add_Services]  WITH CHECK ADD  CONSTRAINT [FK_Order_Add_Services_Add_Services] FOREIGN KEY([ID_Add_Service])
REFERENCES [dbo].[Add_Services] ([ID_Add_Service])
GO
ALTER TABLE [dbo].[Order_Add_Services] CHECK CONSTRAINT [FK_Order_Add_Services_Add_Services]
GO
/****** Object:  ForeignKey [FK_Order_Add_Services_Orders]    Script Date: 05/22/2018 07:37:24 ******/
ALTER TABLE [dbo].[Order_Add_Services]  WITH CHECK ADD  CONSTRAINT [FK_Order_Add_Services_Orders] FOREIGN KEY([ID_Order])
REFERENCES [dbo].[Orders] ([ID_Order])
GO
ALTER TABLE [dbo].[Order_Add_Services] CHECK CONSTRAINT [FK_Order_Add_Services_Orders]
GO
/****** Object:  ForeignKey [FK_Inter_Addresses_Orders]    Script Date: 05/22/2018 07:37:24 ******/
ALTER TABLE [dbo].[Inter_Addresses]  WITH CHECK ADD  CONSTRAINT [FK_Inter_Addresses_Orders] FOREIGN KEY([ID_Order])
REFERENCES [dbo].[Orders] ([ID_Order])
GO
ALTER TABLE [dbo].[Inter_Addresses] CHECK CONSTRAINT [FK_Inter_Addresses_Orders]
GO
