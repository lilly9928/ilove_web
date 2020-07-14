var Grid = {
    Create : function (id, height, field, table, cond, order, param, button) { 
		var names = new Array;
		var fields = new Array;
		var widths = new Array;
		var searchables = new Array;
		var orderables = new Array;
        var visibles = new Array;
        var buttons = [];
        if (button != 'N') {
            buttons = [
                { extend: 'copy', text: '복사'},
                { extend: 'excel', text: '엑셀' },
                { extend: 'print', text: '출력'  }
            ]
        }
		for(var i=0; i<param.length; i++){
			if(param[i].name != undefined){
				names[i] = param[i].name;
			}else{
				alert('name error');
				return;
			}

			if(param[i].field != undefined){
				fields[i] = param[i].field;
			}else{
				alert('field error');
				return;
			}

			if(param[i].width != undefined){
				widths[i] = param[i].width;
			}else{
				widths[i] = '';
			}

			if(param[i].searchable != undefined){
				searchables[i] = param[i].searchable;
			}else{
				searchables[i] = true;
			}

			if(param[i].orderable != undefined){
				orderables[i] = param[i].orderable;
			}else{
				orderables[i] = true;
			}

			if(param[i].visible != undefined){
				visibles[i] = param[i].visible;
			}else{
				visibles[i] = true;
			}
		}

		var html = '<tr id="tr_"'+id+'>\n<th></th>\n';

		for(var i=0; i<param.length; i++){
			html += `<th>${names[i]}</th>\n`;	
		}
		html += `</tr>`;
		  
		$('#tr_' + id).replaceWith(html);

		var colObj = new Object;
		var colArr = new Array;

		colObj.data = 'index';
		colArr.push(colObj);

		for(var i=0; i<param.length; i++){
			var colObj = new Object;
			colObj.data = fields[i];
			colArr.push(colObj); 
		}

		var colDefObj = new Object;
		var colDefArr = new Array;

        colDefObj.targets = 0;
        colDefObj.visible = true;
		colDefObj.width = '10px';
        colDefObj.searchable = false;
        colDefObj.orderable = false;
		colDefArr.push(colDefObj);

		for(var i=0; i<param.length; i++){
			var colDefObj = new Object;
            colDefObj.targets = i+1;
			colDefObj.searchable = searchables[i];
			colDefObj.orderable = orderables[i];
            colDefObj.visible = visibles[i];
            colDefObj.render = ( data, type, row ) => {
                if (data == null) data = ""; 
                return type === 'display' && data.length > 15 ?
                    data.substr( 0, 150 ) :
                    data;
                
            }
			colDefArr.push(colDefObj); 
		}

		myData = {};

        myData.fields = field;
        myData.table = table;
        myData.cond = cond;
        myData.order = order;

		var table = $('#' + id).DataTable({
            order: [],
            ajax: {
                url: '/api/search' ,
                type: 'GET',
                data:function(d){
					return $.extend(d, myData);
				},
                dataSrc: "data",
            },
            scrollY: height  + 'vh',
            columnDefs: colDefArr,
            columns: colArr,
            buttons: buttons,
            scrollX: true,
            select: true,
            /* select : {
                style: 'multi',
            }, */
			pageLength: -1, //한 페이지에 기본으로 보여줄 항목 수를 뜻한다.
			bPaginate: false, //페이징 처리를 할 것인지를 정한다. "false"로 주면 "pageLength"와는 관계 없이 전체 데이터를 출력한다.
			bLengthChange: false, //한 페이지에 보여줄 항목 수를 변경할 것인지를 정한다. "true"로 주면 그리드에 리스트박스를 추가한다.
			lengthMenu : [ [ 15, 30, 50, -1 ], [ 15, 30, 50, "All" ] ], // "bLengthChange" 리스트 항목을 구성할 옵션들을 정해준다.
            bAutoWidth: false, //자동 컬럼 폭을 계산하여 반영한다.
			ordering: true, //항목들에 대한 정렬을 사용할 것인가를 결정한다.
			searching: false, //글로벌 searching 기능을 제공하는데, 타이핑한 캐릭터 별로 검색이 자동 적용되기 때문에 상당히 강력하다.
			processing: true, //"true"로 주면 값을 가져오는 등의 처리 상황에서 대기가 발생할 때, "processing"인디케이터를 보여준다.
			serverSide: false, //그리드 내에서 이루어지는 모든 상황들(검색, 페이징, 정렬 등)에 대한 처리를 서버측에서 수행할 것인가를 뜻한다.
            dom: 'ftBp',
        });

        table.buttons().container()
            .appendTo( '#menu-icon'  );
        $('.dt-button').addClass('btn btn-md');

        //처음 인덱스 값은 검색이나 정렬되더라도 유지
		table.on('order search', function(){
			table.column(0, {search:'applied', order:'applied'}).nodes().each(function(cell, i){
				cell.innerHTML = i+1;
			});
        }).draw();

        /* $('#' + id + ' tbody').on('click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                 $(this).addClass('selected');
            }
        }); */

        // $('#'+id+'_paginate').css({
        //     'display':'none'
        // })
    },

    GetValue : function(id, index, field){
        var value = $('#' + id).DataTable().row(index).data();

        if(value[field] != undefined){
            return value[field];
        }else{
            return -1; //err
        }
    },

    SetValue : function(id, index, field, value){
        var table = $('#' + id).DataTable();

        var changeValue = table.row(index).data();

        changeValue[field] = value;

        table.row(index).data(changeValue).draw();
    },

    GetSelectedIndex : function(id){
        var table = $('#' + id).DataTable();

        var length = table.rows('.selected').data().length;

        if(length == 1){
            return table.row('.selected').index();
        }else{
            return -1;
        }
    },
    GetSelectedMultiIndex : function(id){
        var table = $('#' + id).DataTable();

        var length = table.rows('.selected').data().length;

        if(length > 0){
            return length;
        }else{
            return -1;
        }
    },
    Length : function(id){
        return $('#' + id).DataTable().data().count();
    },

    Select : function(id, index){
		$('#' + id).DataTable().row(index).select();
    },

    SetIndex : function(id, field, value){
        var table = $('#' + id).DataTable();
        
        var lastIndex = 0;

        for(var i=0; i<table.data().count(); i++){
            if(table.row(i).data()[field] == value){
                lastIndex = i;
                break;
            }
        }
        table.row(lastIndex).select();

        var $row = $(table.row(lastIndex - 7).node());
        if ($row.length) {
            $('.dataTables_scrollBody').animate({ scrollTop: $row.offset().top }, 1000);
        }
        //table.row(lastIndex).scrollTo();
    },

    Redraw : function(id, field, table, cond, order){
        myData.fields = field;
        myData.table = table;
        myData.cond = cond;
        myData.order = order;

        $('#' + id).DataTable().ajax.url('/api/search').load(); //url 변경되어야 함.
        
        $('div.customMenu').css({
            'visibility' : 'hidden'
        });
    },

    AddRow: function (id, param) {
        var table = $('#' + id).DataTable();
        var data = new Object();

        data['index'] = '1';

        for(var i=0; i<param.length; i++){
            data[param[i].field] = param[i].value;
        }

        table.row.add(data).draw();

        var rowCount = table.data().length - 1;
        var insertedRow = table.row(rowCount).data();
        var tempRow;
        var sortIndex = rowCount - addCount;

        for (var i = rowCount; i > sortIndex; i--) {
            tempRow = table.row(i - 1).data();
            table.row(i).data(tempRow);
            table.row(i - 1).data(insertedRow);
        }

        tempRow = table.row(0).data();
        table.row(sortIndex).data(tempRow);
        table.row(0).data(insertedRow);

        addCount++;

        //인덱스 다시 정렬
        table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerinnerHTML = i + 1;
        });

        table.$('tr.selected').removeClass('selected'); 
		table.rows(0).nodes().to$().addClass('selected');
    },

    RemoveRow: function(id){
        $('#' + id).DataTable().rows('.selected').remove().draw();
    },
    
    Clear: function(id){
        $('#' + id).DataTable().clear().draw();
    },

    Order: function(id, columnIndex, way){
        $('#' + id).DataTable().order([columnIndex, way]).draw();
    },

	SubTotal: function(id, field){
        var table = $('#' + id).DataTable();

        var subTotal = 0;

        for(var i=0; i<table.data().count(); i++){
            var value = $('#' + id).DataTable().row(i).data();
            var temp = 0;

            if(value[field] != undefined){
                temp = value[field];
            }else{
                temp = -1; //err
            }

            temp = temp * 1;

            if(temp == -1){
                temp = 0;
            }  else if(typeof temp === 'string'){
                temp = 0;
            }

            subTotal += temp;
        }

        if(subTotal_flag == false){
            subTotal_flag = true;
            var data = table.row(0).data();
            
            for(key in data){
                if(data.hasOwnProperty(key)){
                  data[key] = '';
                }
            }
            
            data[field] = subTotal;

            table.row.add(data).draw();

            data['index'] = table.data().length;
            table.order(0,'asc');
            table.rows(table.data().length-1).nodes().to$().addClass('subTotal');
        }else{
            var subTotalIdx = table.data().length-1;
            var data = table.row(subTotalIdx).data();

            data[field] = subTotal;

            table.row(subTotalIdx).data(data).draw();
        }
    },
    
    BackgroundColor: function(id, index, color){
        $('#' + id).DataTable().row(index).nodes().to$().css('background-color', color);
    }, 

    ForegroundColor: function(id, index, color){
        $('#' + id).DataTable().row(index).nodes().to$().css('color', color);
    },
    /*
    OnAdd: function(id, callback){
        $('#' + id + '_contextmenu span[name = add]').on('click', callback);
    },
    */
    OnDoubleClick: function(id, callback){
        $('#' + id + ' tbody').on('dblclick', 'tr', callback);
    },

    OnSelect: function(id, callback){
        $('#' + id).DataTable().on('select', callback);
    },
    OnMultiSelect : function(id){
        var data = $('#' + id).DataTable().rows('.selected').data();
        return data;
    },
    OnDeSelect: function(id, callback){
        $('#' + id).DataTable().on('deselect', callback);
    },

    OnSearch: function(id, callback){
        $('#' + id).on('search.dt', callback).DataTable();
    },

    OnOrder: function(id, callback){
        $('#' + id).on('order.dt', callback).DataTable();
    },

    OnPage: function(id, callback){
        $('#' + id).on('page.dt', callback).DataTable();
    },

    OnDraw: function(id, callback){
        $('#' + id).DataTable().on('draw', callback);
    },

    OnPreDraw: function(id, callback){
        $('#' + id).DataTable().on('preDraw', callback);
    },
}