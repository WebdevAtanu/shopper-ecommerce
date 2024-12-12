const dataTableReducer=(state={current:0},action:any)=>{
	switch (action.type){
	case 'INC':
		return {
		current:state.current+1
	}
	default:
		return state
	}	
}
export default dataTableReducer;