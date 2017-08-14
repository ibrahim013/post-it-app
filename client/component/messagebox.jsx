import React from 'react';

class MessageBox extends React.Component{
constructor(props){
	super(props);
}
render(){
return(
<div>
       <div className="form-group">
  
  <textarea className="form-control" rows="5" id="comment"></textarea>
</div>

<label className="radio-inline"><input type="radio" name="optradio"/>Normal</label>
<label className="radio-inline"><input type="radio" name="optradio"/>Urgent</label>
<label className="radio-inline"><input type="radio"name="optradio"/>Critical</label>
        <button type="button" className="btn btn-success">Send</button>
        
 </div> 
);
}

}

export default MessageBox;