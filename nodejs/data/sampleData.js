exports.cubeListJSON = {
	"cubes" : [ {
		"uniqueName" : "[WDI_WORLDBANK]",
		"name" : "WDI_WORLDBANK",
		"caption" : "WDI - World Bank"
	}, {
		"uniqueName" : "[HAVE FUN]",
		"name" : "Have Fun",
		"caption" : "Have Fun"
	} ]
};

exports.cubeInfoJSON = {
	"uniqueName" : "[WDI_WORLDBANK]",
	"name" : "WDI_WORLDBANK",
	"text" : "WDI - World Bank",
	"dimensions" : [ {
		"uniqueName" : "[GEO].[REGION]",
		"name" : "REGION",
		"text" : "Region",
		"leaf" : true,
		"checked" : false,
		"children" : [

		]

	}, {
		"uniqueName" : "[GEO].[COUNTRY]",
		"name" : "COUNTRY",
		"text" : "Country",
		"leaf" : true,
		"checked" : false,
		"children" : [

		]

	}, {
		"uniqueName" : "[TIME].[YEAR]",
		"name" : "YEAR",
		"text" : "Year",
		"leaf" : true,
		"checked" : false,
		"children" : [

		]

	}

	],
	"measures" : [ {
		"uniqueName" : "[Measures].[GDP]",
		"name" : "GDP",
		"text" : "GDP",
		"leaf" : true,
		"checked" : false
	}, {
		"uniqueName" : "[Measures].[CPI]",
		"name" : "CPI",
		"text" : "CPI",
		"leaf" : true,
		"checked" : false
	}, {
		"uniqueName" : "[Measures].[Interest Rate]",
		"name" : "Interest Rate",
		"text" : "Interest Rate",
		"leaf" : true,
		"checked" : false
	} ]

};

exports.queryResultJSON = {
	"total" : 9,
	"page" : 1,
	"start" : 0,
	"result" : [ {
		"Region" : "Asia",
		"Country" : "China",
		"Year" : "1998",
		"GDP" : "100000",
		"CPI" : "0.2",
		"Interest Rate" : "0.02"
	}, {
		"Region" : "Asia",
		"Country" : "China",
		"Year" : "1999",
		"GDP" : "110000",
		"CPI" : "0.3",
		"Interest Rate" : "0.04"
	}, {
		"Region" : "Asia",
		"Country" : "Japan",
		"Year" : "1999",
		"GDP" : "40000",
		"CPI" : "0.1",
		"Interest Rate" : "0.01"
	}, {
		"Region" : "North America",
		"Country" : "US",
		"Year" : "1999",
		"GDP" : "230000",
		"CPI" : "0.05",
		"Interest Rate" : "0.02"
	}, {
		"Region" : "North America",
		"Country" : "US",
		"Year" : "2000",
		"GDP" : "330000",
		"CPI" : "0.04",
		"Interest Rate" : "0.01"
	}, {
		"Region" : "North America",
		"Country" : "US",
		"Year" : "2001",
		"GDP" : "200000",
		"CPI" : "0.05",
		"Interest Rate" : "0.02"
	}, {
		"Region" : "North America",
		"Country" : "US",
		"Year" : "2002",
		"GDP" : "140000",
		"CPI" : "0.02",
		"Interest Rate" : "0.01"
	}, {
		"Region" : "EMEA",
		"Country" : "UK",
		"Year" : "2001",
		"GDP" : "80000",
		"CPI" : "0.05",
		"Interest Rate" : "0.03"
	} ]
};