Ext.define('Stockholm.controller.StockController', {
	extend : 'Ext.app.Controller',
	views : [ 'StockGrid', 'DockToolbar', 'MethodBox', 'MethodGrid', 'MethodForm', 'MethodFormBox', 'TrendChart' ],
	models : [ 'Quote', 'JobDate', 'Method', 'Trend' ],
	stores : [ 'Quotes', 'JobDates', 'Methods', 'Trends' ],
	init : function() {
		this.control({
			'stockgrid' : {},
			'dock-toolbar > button[action=next-day]' : {
				click : function(btn) {
					var currentSel = Ext.getCmp('dateSelect').getValue();
					var dateStore = Ext.getCmp('dateSelect').getStore().data.items;
					dateStore.forEach(function(item, idx) {
						if (item.data['date_str'] == currentSel) {
							if (dateStore[idx + 1] != null) {
								var combo = Ext.getCmp('dateSelect')
								combo.select(dateStore[idx + 1].data['date_str']);
								combo.fireEvent('select', combo);
							} else {
								console.log("No next!");
							}
						}
					});
				}
			},
			'dock-toolbar > button[action=prev-day]' : {
				click : function(btn) {
					var currentSel = Ext.getCmp('dateSelect').getValue();
					var dateStore = Ext.getCmp('dateSelect').getStore().data.items;
					dateStore.forEach(function(item, idx) {
						if (item.data['date_str'] == currentSel) {
							if (dateStore[idx - 1] != null) {
								var combo = Ext.getCmp('dateSelect')
								combo.select(dateStore[idx - 1].data['date_str']);
								combo.fireEvent('select', combo);
							} else {
								console.log("No previous!");
							}
						}
					});

				}
			},
			'dock-toolbar > button[action=show-basic-st]' : {
				toggle : function(btn) {
					var basicStCol = Ext.getCmp('basicStCol');
					if (btn.pressed) {
						basicStCol.show();
					} else {
						basicStCol.hide();
					}
				}
			},
			'dock-toolbar > button[action=show-adv-st]' : {
				toggle : function(btn) {
					var advStCol = Ext.getCmp('advStCol');
					if (btn.pressed) {
						advStCol.show();
					} else {
						advStCol.hide();
					}
				}
			},
			/*
			 * 'dock-toolbar > button[action=show-back-test]' : { toggle :
			 * function(btn) { var backTestCol = Ext.getCmp('backTestCol'); if
			 * (btn.pressed) { backTestCol.show(); } else { backTestCol.hide(); } } },
			 */
			'dock-toolbar > button[action=show-real-profit]' : {
				toggle : function(btn) {
					var backTestCol = Ext.getCmp('backTestCol');
					var backTestCol_all = Ext.getCmp('backTestCol_dif');
					if (btn.pressed) {
						backTestCol_all.hide();
						backTestCol.show();
					} else {
						backTestCol_all.show();
						backTestCol.hide();
					}
				}
			},
			'dock-toolbar > button[action=run-test]' : {
				click : function(btn) {
					Ext.Msg.show({
						title : '确认执行',
						msg : '即将根据最近50个交易日的数据进行回测，请确认。',
						fn : runBackTest,
						buttons : Ext.Msg.YESNO,
						icon : Ext.Msg.QUESTION
					});
				}
			},
			'dock-toolbar > button[action=show-method]' : {
				click : function(btn) {
					Ext.create('widget.methodbox').show();
				}
			}
		});
	}
});

var runBackTest = function(buttonId, e, obj) {
	if (buttonId == 'yes') {
		var ids = obj.ids;
		if (ids == null) {
			ids = '';
		}
		var mask = new Ext.LoadMask(Ext.getBody(), {
			msg : '正在执行...'
		});
		mask.show();
		var requestConfig = {
			url : '/stockholm/runtest?ids=' + ids,
			timeout : 300000,
			success : function(response) {
				mask.destroy();
				var result = Ext.JSON.decode(response.responseText, true);
				Ext.Msg.alert('Success', result['msg']);

				var grid = Ext.getCmp('stockGrid');
				grid.getStore().reload({
					callback : function() {
						grid.getView().refresh();
					}
				});
			},
			failure : function() {
				mask.destroy();
				Ext.Msg.alert('Failed', '发生未知错误...');
			}
		};
		Ext.Ajax.request(requestConfig);
	}
}