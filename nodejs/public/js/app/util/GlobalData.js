Ext.define('Datanium.GlobalData', {
	singleton : true,
	tabindex : 0,
	queryParam : {
		dimensions : [],
		measures : [],
		groups : [],
		filters : {},
		primaryDimension : null,
		split : {
			dimensions : null,
			splitValue : []
		},
		isSplit : false
	},
	qubeInfo : {
		dimensions : [],
		measures : []
	},
	queryResult : null,
	queryResult4Chart : null,
	enableQuery : false,
	groups : [],
	rptMode : 'grid',
	chartMode : 'columnchart',
	autoScale : false,
	showLegend : true,
	autoRun : true,
	dimensionValues : [],
	popDimensionKey : null,
	popDimension : null
});