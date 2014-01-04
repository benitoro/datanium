Ext.define('Datanium.view.ChartView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.datachartview',
	itemId : Datanium.util.CommonUtils.genItemId('datachartview'),

	layout : 'border',
	items : [ {
		// xtype : 'chartpanel',
		region : 'center',
		layout : 'border',
		itemId : Datanium.util.CommonUtils.genItemId('chartpanel'),
		floatable : false,
		collapsible : false,
		header : false,
		legend : {
			position : 'right'
		},
		width : '100%',
		height : 'auto',
		chartType : 'stackedcolumn'
	} ]
});
