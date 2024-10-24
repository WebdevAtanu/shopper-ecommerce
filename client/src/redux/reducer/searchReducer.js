const searchReducer=(state={search:''},action)=>{
	switch(action.type){
	case 'searchWord':
		return{
			search:action.payload
		}
	default:
		return state;
	}
}
export default searchReducer;