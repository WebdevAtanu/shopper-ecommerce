const categoryReducer=(state={category:'all'},action:any)=>{
	switch (action.type){
	case 'optionChange':
		return {
		category:action.payload
	}
	default:
		return state
	}	
}
export default categoryReducer;