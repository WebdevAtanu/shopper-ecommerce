const searchReducer=(state={search:''},action:any)=>{
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