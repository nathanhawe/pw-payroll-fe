const batch = [
	{
		id: 1,
		dateCreated: new Date(2020, 1 - 1, 2, 10),
		dateModified: new Date(2020, 1 - 1, 2, 10),
		isDeleted: 0,
		isComplete: 1,
		owner: "tmctesterface",
		company: "P",
		layoffId: null,
		weekEndDate: new Date(2019, 12 - 1, 29, 0),
	},
	{
		id: 2,
		dateCreated: new Date(2020, 1 - 1, 2, 11, 30),
		dateModified: new Date(2020, 1 - 1, 2, 11, 30),
		isDeleted: 0,
		isComplete: 1,
		owner: "tmctesterface",
		company: "R",
		layoffId: null,
		weekEndDate: new Date(2019, 12 - 1, 29, 0),
	},
	{
		id: 3,
		dateCreated: new Date(2020, 1 - 1, 9, 10),
		dateModified: new Date(2020, 1 - 1, 9, 10),
		isDeleted: 0,
		isComplete: 1,
		owner: "tmctesterface",
		company: "P",
		layoffId: null,
		weekEndDate: new Date(2020, 1 - 1, 5),
	},
	{
		id: 4,
		dateCreated: new Date(2020, 1 - 1, 9, 11, 30),
		dateModified: new Date(2020, 1 - 1, 9, 11, 30),
		isDeleted: 0,
		isComplete: 1,
		owner: "tmctesterface",
		company: "R",
		layoffId: null,
		weekEndDate: new Date(2020, 1 - 1, 5),
	},
	{
		id: 5,
		dateCreated: new Date(2020, 1 - 1, 16, 10),
		dateModified: new Date(2020, 1 - 1, 16, 10),
		isDeleted: 0,
		isComplete: 1,
		owner: "tmctesterface",
		company: "P",
		layoffId: null,
		weekEndDate: new Date(2020, 1 - 1, 12),
	},
	{
		id: 6,
		dateCreated: new Date(2020, 1 - 1, 16, 11, 30),
		dateModified: new Date(2020, 1 - 1, 16, 11, 30),
		isDeleted: 0,
		isComplete: 1,
		owner: "tmctesterface",
		company: "R",
		layoffId: null,
		weekEndDate: new Date(2020, 1 - 1, 12),
	},
	{
		id: 7,
		dateCreated: new Date(2020, 1 - 1, 23, 10),
		dateModified: new Date(2020, 1 - 1, 23, 10),
		isDeleted: 0,
		isComplete: 1,
		owner: "tmctesterface",
		company: "P",
		layoffId: null,
		weekEndDate: new Date(2020, 1 - 1, 19),
	},
	{
		id: 8,
		dateCreated: new Date(2020, 1 - 1, 23, 11, 30),
		dateModified: new Date(2020, 1 - 1, 23, 11, 30),
		isDeleted: 0,
		isComplete: 1,
		owner: "tmctesterface",
		company: "R",
		layoffId: null,
		weekEndDate: new Date(2020, 1 - 1, 19),
	},
	{
		id: 9,
		dateCreated: new Date(2020, 1 - 1, 27, 9, 30),
		dateModified: new Date(2020, 1 - 1, 27, 9, 30),
		isDeleted: 0,
		isComplete: 1,
		owner: "tmctesterface",
		company: "R",
		layoffId: 11,
		weekEndDate: new Date(2020, 1 - 1, 26),
	},
	{
		id: 10,
		dateCreated: new Date(2020, 1 - 1, 27, 9, 45),
		dateModified: new Date(2020, 1 - 1, 27, 9, 45),
		isDeleted: 0,
		isComplete: 1,
		owner: "tmctesterface",
		company: "R",
		layoffId: 12,
		weekEndDate: new Date(2020, 1 - 1, 26),
	},
	{
		id: 11,
		dateCreated: new Date(2020, 1 - 1, 30, 10),
		dateModified: new Date(2020, 1 - 1, 30, 10),
		isDeleted: 0,
		isComplete: 1,
		owner: "tmctesterface",
		company: "P",
		layoffId: null,
		weekEndDate: new Date(2020, 1 - 1, 26),
	},
	{
		id: 12,
		dateCreated: new Date(2020, 1 - 1, 30, 11, 30),
		dateModified: new Date(2020, 1 - 1, 30, 11, 30),
		isDeleted: 0,
		isComplete: 1,
		owner: "tmctesterface",
		company: "R",
		layoffId: null,
		weekEndDate: new Date(2020, 1 - 1, 26),
	},
];

const crewBossWage = [
	{
		id: 1,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 24.5,
		workerCountThreshold: 36,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 2,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 24.0,
		workerCountThreshold: 35,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 3,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 23.5,
		workerCountThreshold: 34,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 4,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 23.0,
		workerCountThreshold: 33,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 5,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 22.5,
		workerCountThreshold: 32,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 6,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 22.0,
		workerCountThreshold: 31,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 7,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 21.5,
		workerCountThreshold: 30,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 8,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 21.0,
		workerCountThreshold: 29,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 9,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 20.5,
		workerCountThreshold: 28,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 10,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 20.0,
		workerCountThreshold: 27,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 11,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 19.5,
		workerCountThreshold: 26,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 12,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 19.0,
		workerCountThreshold: 25,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 13,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 18.5,
		workerCountThreshold: 24,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 14,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 18.25,
		workerCountThreshold: 23,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 15,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 18.0,
		workerCountThreshold: 22,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 16,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 17.75,
		workerCountThreshold: 21,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 17,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 17.5,
		workerCountThreshold: 20,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 18,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 17.25,
		workerCountThreshold: 19,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 19,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 17.0,
		workerCountThreshold: 18,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 20,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 16.75,
		workerCountThreshold: 17,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 21,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 16.5,
		workerCountThreshold: 16,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 22,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 16.25,
		workerCountThreshold: 15,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
	{
		id: 23,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 16.0,
		workerCountThreshold: 0,
		effectiveDate: new Date(2020, 12 - 1, 2),
	},
];

const crewLaborWage = [
	{
		id: 1,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 13.0,
		effectiveDate: new Date(2000, 1 - 1, 1),
	},
	{
		id: 2,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 14.0,
		effectiveDate: new Date(2020, 1 - 1, 21),
	},
];

const minimumWage = [
	{
		id: 1,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 8.0,
		effectiveDate: new Date(2010, 1 - 1, 1),
	},
	{
		id: 2,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 9.0,
		effectiveDate: new Date(2014, 7 - 1, 1),
	},
	{
		id: 3,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 10.0,
		effectiveDate: new Date(2016, 1 - 1, 1),
	},
	{
		id: 4,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 10.5,
		effectiveDate: new Date(2017, 1 - 1, 1),
	},
	{
		id: 5,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 11.0,
		effectiveDate: new Date(2018, 1 - 1, 1),
	},
	{
		id: 6,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 12.0,
		effectiveDate: new Date(2019, 1 - 1, 1),
	},
	{
		id: 7,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 13.0,
		effectiveDate: new Date(2020, 1 - 1, 1),
	},
	{
		id: 8,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 14.0,
		effectiveDate: new Date(2021, 1 - 1, 1),
	},
	{
		id: 9,
		dateCreated: new Date(),
		dateModified: new Date(),
		isDeleted: 0,
		wage: 15.0,
		effectiveDate: new Date(2022, 1 - 1, 1),
	},
];

module.exports = { batch, crewBossWage, crewLaborWage, minimumWage };
