const categoryReducer=(state={category:'all'},action)=>{
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