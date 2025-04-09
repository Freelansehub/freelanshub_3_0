import Order from "../../components/Order/Order";

export default function KabinetClient() : React.ReactElement {
    return (
        <div>
            <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
  <div className="list-group list-group-checkable d-grid gap-2 border-0">
  <input type="search" className="form-control" placeholder="Пошук по назві..." aria-label="Search"/>
    <input className="list-group-item-check pe-none" type="radio" name="listGroupCheckableRadios" id="listGroupCheckableRadios1" value="" />
    <label className="list-group-item rounded-3 py-3" htmlFor="listGroupCheckableRadios1">
      Всі замовлення
      <span className="d-block small opacity-50">With support text underneath to add more detail</span>
    </label>

    <input className="list-group-item-check pe-none" type="radio" name="listGroupCheckableRadios" id="listGroupCheckableRadios2" value=""/>
    <label className="list-group-item rounded-3 py-3" htmlFor="listGroupCheckableRadios2">
      Вільні
      <span className="d-block small opacity-50">Some other text goes here</span>
    </label>

    <input className="list-group-item-check pe-none" type="radio" name="listGroupCheckableRadios" id="listGroupCheckableRadios3" value=""/>
    <label className="list-group-item rounded-3 py-3" htmlFor="listGroupCheckableRadios3">
      На виконанні
      <span className="d-block small opacity-50">And we end with another snippet of text</span>
    </label>

    <input className="list-group-item-check pe-none" type="radio" name="listGroupCheckableRadios" id="listGroupCheckableRadios4" value="" />
    <label className="list-group-item rounded-3 py-3" htmlFor="listGroupCheckableRadios4">
      Виконанні
      <span className="d-block small opacity-50">This option is disabled</span>
    </label>
    
  </div>
  <div className="container">
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <Order/>
      <Order/>
      <Order/> 
      <Order/>
      
      
    </div>
  </div>
</div>

            
        </div>
    );
}