

export default function kabinetClient() : React.ReactElement {
    return (
        <div>
            <div className="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
  <div className="list-group list-group-checkable d-grid gap-2 border-0">
    <input className="list-group-item-check pe-none" type="radio" name="listGroupCheckableRadios" id="listGroupCheckableRadios1" value="" />
    <label className="list-group-item rounded-3 py-3" htmlFor="listGroupCheckableRadios1">
      
      <span className="d-block small opacity-50">With support text underneath to add more detail</span>
    </label>

    <input className="list-group-item-check pe-none" type="radio" name="listGroupCheckableRadios" id="listGroupCheckableRadios2" value=""/>
    <label className="list-group-item rounded-3 py-3" htmlFor="listGroupCheckableRadios2">
      Second radio
      <span className="d-block small opacity-50">Some other text goes here</span>
    </label>

    <input className="list-group-item-check pe-none" type="radio" name="listGroupCheckableRadios" id="listGroupCheckableRadios3" value=""/>
    <label className="list-group-item rounded-3 py-3" htmlFor="listGroupCheckableRadios3">
      Third radio
      <span className="d-block small opacity-50">And we end with another snippet of text</span>
    </label>

    <input className="list-group-item-check pe-none" type="radio" name="listGroupCheckableRadios" id="listGroupCheckableRadios4" value="" />
    <label className="list-group-item rounded-3 py-3" htmlFor="listGroupCheckableRadios4">
      Fourth disabled radio
      <span className="d-block small opacity-50">This option is disabled</span>
    </label>
  </div>
</div>
        </div>
    );
}