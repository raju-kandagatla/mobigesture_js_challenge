$(document).ready( function (){

		$.get("https://jsonplaceholder.typicode.com/posts/", function(data, status){
			//alert("Data: " + data + "\nStatus: " + status);
			$.each(data, function (index, value) {
				//console.log(value.userId)
				append_html = '<tr><td><input type= "checkbox" name="select-one[]" id="select-one_'+value.userId+'" class="select-one" value= '+value.userId+' ></td><td>'+value.userId+'</td><td id="title_'+value.userId+'">'+value.title+'</td><td id="body_'+value.userId+'">'+value.body+'</td></tr>';
				
				$('#myTable tr:last').after(append_html)
			})
			
			
			
		  });
		  
	 $('#selectAll').click (function () {
		 var checkedStatus = this.checked;
			$('#myTable tr').find('td:first :checkbox').each(function () {
			$(this).prop('checked', checkedStatus);
		 });
	});
	 $('#myTable').paginate({
        'elemsPerPage': 5,

    });
   
});

function userEdit(){
	
	 var ckbox = $('.select-one');
	 
		if (ckbox.is(':checked') && $('[name="select-one[]"]:checked').length == 1) 
		{
			checkedvalue = $('[name="select-one[]"]:checked').val();
			title_text = $("#myTable #title_"+checkedvalue+"").text();
			body_text = $("#myTable #body_"+checkedvalue+"").text();
			$('#title_txt').val(title_text);
			$('#body_content').val(body_text);
			$("#editmodal").modal('show');
			$('#update_rec').click(function(){	
					
					update_title= $('#title_txt').val();
					update_body= $('#title_txt').val();
					$('#body_content').val(body_text);
					
					$.ajax({  
						url: 'https://jsonplaceholder.typicode.com/posts/'+checkedvalue+'',  
						type: 'PUT',  
						dataType: 'json',  
						data: {'userId': checkedvalue, 'title':update_title,'body':update_body},  
						success: function (data, textStatus, xhr) {   
							alert('updated successfully');	
							$("#editmodal").modal('hide');		
							location.reload(); 
						},  
						error: function (xhr, textStatus, errorThrown) {  
							console.log('Error in Operation');  
						}  
					});
			
			});
		
		} 
		else if(ckbox.is(':checked') && $('[name="select-one[]"]:checked').length > 1){
			alert('select only one record');
			location.reload(); 
		}
		
		else {
				alert('please select atleast one record');
		}

}

function userAdd(){
	
	 $("#addmodal").modal('show');
	 $('#add_rec').click(function(){	
					
					title= $('#title_txt').val();
					body= $('#title_txt').val();
					
					$.ajax({  
						url: 'https://jsonplaceholder.typicode.com/posts',  
						type: 'POST',  
						dataType: 'json',  
						data: {'userId': 1, 'title':title,'body':body},  
						success: function (data, textStatus, xhr) {   
							alert('updated successfully');	
							$("#editmodal").modal('hide');		
							location.reload(); 
						},  
						error: function (xhr, textStatus, errorThrown) {  
							console.log('Error in Operation');  
						}  
					});
			
			});
}

function userDelete(){

	 var ckbox = $('.select-one');
	 
		if (ckbox.is(':checked') && $('[name="select-one[]"]:checked').length > 0) 
		{
		
				var checkedArr = [];
				$('[name="select-one[]"]:checked').each(function(i){
					checkedArr.push($(this).val());
				});
				
				// In api documentation [ https://jsonplaceholder.typicode.com/guide/ ] have single deletion so adding and choosing below one
				
				idTodelete = $('[name="select-one[]"]:checked').val();
				//console.log('checkedArr'+checkedArr);
				$("#deletemodal").modal('show');
						
			 $("#deletemodal").modal('show');
			 
			 $('#delete_users').click(function(){	
					
							
							$.ajax({  
								url: 'https://jsonplaceholder.typicode.com/posts/'+idTodelete+'',  
								type: 'DELETE',  
								dataType: 'json',  
								data: {'userId': idTodelete},  
								success: function (data, textStatus, xhr) {   
									alert('user(s) deleted successfully');	
									$("#editmodal").modal('hide');		
									location.reload(); 
								},  
								error: function (xhr, textStatus, errorThrown) {  
									console.log('Error in Operation');  
								}  
							});
					
					});
		
		
		} 
		
		else {
				alert('please select atleast one record');
		}
		

}

