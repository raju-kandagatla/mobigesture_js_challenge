$(document).ready( function (){

		$.get("https://jsonplaceholder.typicode.com/posts/", function(data, status, event){
			//alert("Data: " + data + "\nStatus: " + status);
			var arr= [];
			$.each(data, function (index, value) {
				
				console.log(data[index]['title']);
				
				append_html = '<tr><td><input type= "checkbox" name="select-one[]" id="select-one_'+data[index]['id']+'" class="select-one" value= '+data[index]['id']+' ></td><td>'+data[index]['id']+'</td><td id="title_'+data[index]['id']+'">'+data[index]['title']+'</td><td id="body_'+data[index]['id']+'">'+data[index]['body']+'</td></tr>';
				
				$('#myTable tbody').prepend(append_html);
				
				//document.getElementById("xxx").innerHTML = append_html;
				
			})
			$('#myTable').paginate({
					'elemsPerPage': 5,
					

			});
	
		  });
		  
	 $('#selectAll').click (function () {
		 var checkedStatus = this.checked;
			$('#myTable tr').find('td:first :checkbox').each(function () {
			$(this).prop('checked', checkedStatus);
		 });
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
					body= $('#body_content').val();
					
					$.ajax({  
						url: 'https://jsonplaceholder.typicode.com/posts',  
						type: 'POST',  
						dataType: 'json',  
						data: {'id': 1, 'title':title,'body':body},  
						success: function (data, textStatus, xhr) {   
							alert('record added successfully');	
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
				
			 $("#deletemodal").modal('show');
			 
			 
			 $('#delete_users').click(function(){	
				
				delete_ssuccess= false;
				console.log('checkedArr'+checkedArr)
				for(i=0; i<checkedArr.length; i++ )
				{	
							$.ajax({  
								url: 'https://jsonplaceholder.typicode.com/posts/'+checkedArr[i]+'',  
								type: 'DELETE',  
								dataType: 'json',  
								data: {'id': checkedArr[i]},  
								success: function (data, textStatus, xhr) {
									delete_ssuccess= true;
									
									$("#deletemodal").modal('hide');	
									location.reload(); 
									return false								
									
								},  
								error: function (xhr, textStatus, errorThrown) {  
									delete_ssuccess= false;	
									console.log('Error in Operation');  
								}  
							});
							
				}
				
			
					
					});
		
			
		} 
		
		else {
				alert('please select atleast one record');
		}
		

}

