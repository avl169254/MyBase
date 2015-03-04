var templateHandle = (function($, window) {
	var elements = [],
		objects = [];

	var _init = function() {

			//搜索元素
			// elements.formSearch = $('#formSearch');
			// elements.selTeamTenant = $('#selTeamTenant');
			// elements.selTeamStore = $('#selTeamStore');
			// elements.elTableFilter = $('#tableFilter');
			// elements.btTableFilterClose = $('.close', elements.elTableFilter);
			// elements.selTenantProvince = $('#selTenantProvince');
			// elements.selTenantCity = $('#selTenantCity');
			// elements.selTenantArea = $('#selTenantArea');
			elements.btEditTemplate = $('#btEditTemplate');
			elements.btAddTemplate = $('#btAddTemplate');

			objects.tenantIdForRow = '';
			objects.curDataList = [];
			objects.editRow = 0;
			objects.rechargeTenantId = '';
			objects.keyField = 'field';
			objects.keyTip = 'tip';
			objects.keyId = 'id';
			objects.keyIds = "ids";
			objects.addDataList = [];

			$('#my_multi_select2').multiSelect();
			$('#my_multi_select1').multiSelect();

			$('#selCategory').change(function() {
				var value = $(this).val();
				if (value == "Enabled") {
					$("[name='selCategory']").show()
				} else {
					$("[name='selCategory']").hide()
				}
			});

		},
		_bindEvent = function() {

			// snap inc

			$('#rangeList').one('click', function() {

				setTimeout(function() {
					$("#range_5").ionRangeSlider({
						min: 0,
						max: 6000,
						type: 'single',
						step: 0.1,
						postfix: " Kbps",
						prettify: false,
						hasGrid: true
					});
					$("#range_6").ionRangeSlider({
						min: 0,
						max: 6000,
						type: 'single',
						step: 0.1,
						postfix: " Kbps",
						prettify: false,
						hasGrid: true
					});
				}, 100);

			});

			//编辑模版
			elements.btEditTemplate.click(function() {
				var editTemplateWindow = $('#editTemplateWindow');
				editTemplateWindow.find('.modal-title span').html('编辑模版');
				editTemplateWindow.modal('show');

			});

			elements.btAddTemplate.click(function() {
				var editTemplateWindow = $('#editTemplateWindow');
				editTemplateWindow.find('.modal-title span').html('添加模版');
				editTemplateWindow.modal('show');
			});

			var templatemgrCols = [{
				"mData": "type",
				"bSortable": false,
				"fnRender": function(
					obj) {
					return "<div class='checker'><span><input type='checkbox' value='" + obj.aData.id + "' class='checkboxes'></span></div>";
				}
			}, {
				"mData": "name"
			}, {
				"mData": "tanents"
			}, {
				"mData": "models"
			}, {
				"mData": "createBy"
			}, {
				"mData": "createTime",
				"fnRender": function(
					obj) {
					if (obj.aData.createTime) {
						var date = new Date(obj.aData.createTime);
						return date.format("yyyy/MM/dd hh:mm");
					} else {
						return "";
					}
				}
			}];

			objects.mainTable = $('#template_table').dataTable({
				"bServerSide": true,
				"bProcessing": true,
				"iDisplayLength": 50,
				"aLengthMenu": [
					[50, 100, 200],
					[50, 100, 200]
				],
				"oLanguage": {
					"sLengthMenu": "每页显示 _MENU_ 条记录",
					"sZeroRecords": "抱歉， 没有找到",
					"sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
					"sInfoEmpty": "没有数据",
					"sInfoFiltered": "", //"sInfoFiltered": "(从 _MAX_ 条数据中检索)",
					"oPaginate": {
						"sFirst": "首页",
						"sPrevious": "前一页",
						"sNext": "后一页",
						"sLast": "尾页"
					},
					"sProcessing": "努力加载中，请稍候...", //"<img src='static/images/wifi-up.png' />",
					"sZeroRecords": "没有检索到数据",
					"sSearch": "<img src='static/images/search.png'></img>"
				},
				"aaSorting": [
					[1, 'asc']
				],
				"fnServerParams": function(aoData) {
					for (var i = 0; i < objects.addDataList.length; i++) {
						aoData.push(objects.addDataList[i]);
					};

				},
				"aoColumns": templatemgrCols,
				"fnRowCallback": function(row) {
					$(row).click(function() {
						rowClick($(this), objects.mainTable);
						objects.editRow = row;
					});
				},
				"sServerMethod": "POST",
				"sAjaxSource": 'template/page',
				"fnServerData": function(sSource, aoData, fnCallback) {
					$.ajax({
						"dataType": "json",
						"type": "POST",
						"url": sSource,
						"data": aoData,
						"success": function(result) {
							objects.curDataList = result.aaData;
							fnCallback(result);
						},
					});
				}
			});

			$('#template_table_wrapper .dataTables_filter input').addClass("form-control dataTables_filter_input").attr("placeholder", "搜索模板名称");
			$('#template_table_wrapper .dataTables_length select').addClass("form-control input-msmall");

		};

	return {
		init: function() {
			_init();
			_bindEvent();
		}

	}

})(jQuery, window);

$(function() {
	templateHandle.init();
});