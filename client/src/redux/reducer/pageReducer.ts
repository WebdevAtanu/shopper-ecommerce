const pageReducer=(state={current:0},action:any)=>{
	switch (action.type){
	case 'PREVIOUS':
		return {
		current:state.current-1
	}
	case 'NEXT':
	return{
		current:state.current+1
	}
	default:
		return state
	}	
}
export default pageReducer;