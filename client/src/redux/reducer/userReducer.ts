const userReducer=(state:any={data:[]},action:any)=>{
	switch(action.type){
	case 'userData':
		return{
			data:action.payload
		}
	default:
		return state;
	}
}
export default userReducer;