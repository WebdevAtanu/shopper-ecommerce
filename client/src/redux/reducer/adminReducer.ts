const adminReducer=(state:any={status:true},action:any)=>{
	switch (action.type){
	case 'adminTrue':
		return {
		status:true
	}
	case 'adminFalse':
	return{
		status:false
	}
	default:
		return state
	}
}

export default adminReducer;