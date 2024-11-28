const loginReducer=(state:any={status:false},action:any)=>{
	switch (action.type){
	case 'stateTrue':
		return {
		status:true
	}
	case 'stateFalse':
	return{
		status:false
	}
	default:
		return state
	}
}

export default loginReducer;