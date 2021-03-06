USE [Taxi]
GO
/****** Object:  Table [dbo].[Add_Services]    Script Date: 05/24/2018 22:05:55 ******/
SET IDENTITY_INSERT [dbo].[Add_Services] ON
INSERT [dbo].[Add_Services] ([ID_Add_Service], [Name], [Price]) VALUES (1, N'child', 50)
INSERT [dbo].[Add_Services] ([ID_Add_Service], [Name], [Price]) VALUES (2, N'animal', 100)
SET IDENTITY_INSERT [dbo].[Add_Services] OFF
/****** Object:  Table [dbo].[Rates]    Script Date: 05/24/2018 22:05:55 ******/
SET IDENTITY_INSERT [dbo].[Rates] ON
INSERT [dbo].[Rates] ([ID_Rate], [Name], [Min_Price], [Km_Price], [Wait_Min_Price]) VALUES (1, N'Эконом', 45, 10, 5)
INSERT [dbo].[Rates] ([ID_Rate], [Name], [Min_Price], [Km_Price], [Wait_Min_Price]) VALUES (2, N'Комфорт', 56, 20, 10)
SET IDENTITY_INSERT [dbo].[Rates] OFF
/****** Object:  Table [dbo].[Dispatchers]    Script Date: 05/24/2018 22:05:55 ******/
SET IDENTITY_INSERT [dbo].[Dispatchers] ON
INSERT [dbo].[Dispatchers] ([ID_Dispatcher], [LastName], [FirstName], [Login], [Password]) VALUES (1, N'Петрова', N'Анастасия', N'petrova', N'anastasiya')
SET IDENTITY_INSERT [dbo].[Dispatchers] OFF
/****** Object:  Table [dbo].[Clients]    Script Date: 05/24/2018 22:05:55 ******/
/****** Object:  Table [dbo].[Client_Addresses]    Script Date: 05/24/2018 22:05:55 ******/
/****** Object:  Table [dbo].[Drivers]    Script Date: 05/24/2018 22:05:55 ******/
SET IDENTITY_INSERT [dbo].[Drivers] ON
INSERT [dbo].[Drivers] ([ID_Driver], [LastName], [FirstName], [Patronymic], [Phone_Number], [Password], [Car_Number], [Car_Description], [Status], [Coordinates], [ID_Rate]) VALUES (1, N'Иванов', N'Василий', N'Петрович', N'89991645325', N'ivanov', N'у564па', N'Синий Nissan', N'free', NULL, 1)
INSERT [dbo].[Drivers] ([ID_Driver], [LastName], [FirstName], [Patronymic], [Phone_Number], [Password], [Car_Number], [Car_Description], [Status], [Coordinates], [ID_Rate]) VALUES (3, N'Сидоров', N'Андрей', N'Иванович', N'89834896514', N'sidorov', N'о143ур', N'Черный BMW', N'free', NULL, 2)
SET IDENTITY_INSERT [dbo].[Drivers] OFF
/****** Object:  Table [dbo].[Driver_Add_Services]    Script Date: 05/24/2018 22:05:55 ******/
SET IDENTITY_INSERT [dbo].[Driver_Add_Services] ON
INSERT [dbo].[Driver_Add_Services] ([ID_Driver_Add_Service], [ID_Add_Service], [ID_Driver]) VALUES (1, 1, 1)
INSERT [dbo].[Driver_Add_Services] ([ID_Driver_Add_Service], [ID_Add_Service], [ID_Driver]) VALUES (2, 2, 1)
INSERT [dbo].[Driver_Add_Services] ([ID_Driver_Add_Service], [ID_Add_Service], [ID_Driver]) VALUES (3, 1, 1)
SET IDENTITY_INSERT [dbo].[Driver_Add_Services] OFF
/****** Object:  Table [dbo].[Orders]    Script Date: 05/24/2018 22:05:55 ******/
/****** Object:  Table [dbo].[Order_Add_Services]    Script Date: 05/24/2018 22:05:55 ******/
/****** Object:  Table [dbo].[Inter_Addresses]    Script Date: 05/24/2018 22:05:55 ******/
