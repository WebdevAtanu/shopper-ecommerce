const loginReducer=(state:any={status:false},action:any)=>{
	if(action.type=='statusChange'){
		return {status:true}
	}
	else{
		return state
	}
}

export default loginReducer;