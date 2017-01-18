var React = require('react')

var Table = React.createClass({

  getInitialState: function() {
     return {currentData: this.props.data};
  },

  render: function() {
    
    if(this.props.data.length == 0){
      return(<h3>Loading...</h3>)
    } 
    //  return(<h3>Loading...</h3>)

    var key = Date.now();

    var tableHeader = Object.keys(this.props.data[0]).map(function(columnName){

        key = key+1;

        return (
            <th key={key} data-field={columnName}>{columnName}</th>
        );
    });

    var tableRow = this.props.data.map(function(rowObject){

        var i;
        var returnValue = [];


        for (i in rowObject){

            key = key+1;


            returnValue.push(
                <td key={key}>
                    {rowObject[i]}
                </td>

            )
        };

        key = key+1;

        return (<tr key={key}>
            {returnValue}
            </tr>
        );

    });

    return (
        <table>
            <thead>
                  <tr>
                      {tableHeader}
                  </tr>
                </thead>

                <tbody>
                      {tableRow}
                </tbody>
        </table>
    );
  }
});

export default Table
