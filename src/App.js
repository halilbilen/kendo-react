
import React,{Component} from "react";
import './App.css';
import { data } from "./data";
import "@progress/kendo-theme-material/dist/all.css";
import { Grid, GridColumn,GridDetailRow, GridToolbar } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import { ExcelExport } from '@progress/kendo-react-excel-export';
// const BooleanCell = (props) => {
//   return (
//     <td>{props.dataItem[props.field] ? '✅' : '❌'}</td>
//   )
// }

class App extends Component {
  constructor(props) {
    super(props)
    const dataState = {
      skip: 0,
      take: 10,
      sort: [
          { field: 'orderDate', dir: 'desc' }
      ]
    };
    this.state = {
      dataResult: process(data, dataState),
      dataState: dataState,
      detail:[],
      change:false,
    };
  }
  
  onDataStateChange = (event) => {
    this.setState({dataResult: process(data, event.dataState),dataState: event.dataState});
}

 expandChange = (event) => {
  const isExpanded = event.dataItem.expanded === undefined ? event.dataItem.aggregates : event.dataItem.expanded;
  event.dataItem.expanded = !isExpanded;
  this.setState({ ...this.state });
}

    exportExcel = () => {
        this._export.save();
    }

render(){
  return (
    <div style={{width:"100%", height:"50%"}}>
     <div style={{width:"100%",height:"100px",backgroundColor:"yellow"}}>
        <button onClick={()=>this.setState({change:!this.state.change})}>LİSTELE</button>
     </div>
      {

        this.state.change?
          <ExcelExport data={data}ref={(exporter) => { this._export = exporter; }}>  
              <Grid 
              data={this.state.dataResult}
              filterable={true}
              pageable={true}
              detail={DetailComponent}
              onDataStateChange={this.onDataStateChange}
              total={data.length}
              expandField="expanded"
                onExpandChange={this.expandChange}
              {...this.state.dataState}>
                <GridToolbar>
                <button title="Export to Excel" className="k-button k-primary" onClick={this.exportExcel}>
                    Export to Excel
                </button>&nbsp;
            </GridToolbar>
                                            
                                          
            <GridColumn  field="orderID" title="ID" />
            <GridColumn field="customerID" />
              <GridColumn field="orderDate"  />
              <GridColumn field="shipName"  />
              <GridColumn field="freight" />
              <GridColumn field="shippedDate" />
              <GridColumn field="employeeID" />
              
              </Grid>
              </ExcelExport>
              :null
           }
      </div>
    );
  }
}

class DetailComponent extends GridDetailRow {
  render() {
    const data = this.props.dataItem.details;
    console.log(data)
    if (data) {
        return (
            <Grid data={data}>
                <GridColumn field="productID" title="ID" />
                <GridColumn field="quantity" title="quantity" />
                <GridColumn field="unitPrice" title="Price" />
            </Grid>
        );
    }
    return (
        <div style={{ height: "50px", width: '100%' }}>
            <div style={{ position: 'absolute', width: '100%' }}>
                <div className="k-loading-image" />
            </div>
        </div>
    );
}

  


         
}

export default App;
