import { observer } from "mobx-react";
import React, { Component } from "react";
import { BookingState } from "../Enums/BookingState";
import { Session } from "../System/Models/Session";
import { locator } from "../System/ServiceLocator";
import { ApiService } from "../System/Services/ApiService";
import { Store } from "../System/Stores";
import { DatePicker } from "./DatePicker";
import LangSelector from "./LangSelector";

interface IProps {}

interface IState {}

@observer
export class Index extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.onBookableRequest = this.onBookableRequest.bind(this);
  }

  async componentDidMount() {
    const apiService = locator(ApiService);

    let products = await apiService.getProducts();

    console.log("Products:", products);

    if (products != null && products.length > 0) {
      Store.setProduct(products[0]);

      if (Store.product != null) {
        let sessions: Session[] | null = await apiService.getAvailabilitiesFor(
          Store.product.code
        );

        if (sessions != null) Store.setAvailableSessions(sessions);
      }
    }
  }

  render() {
    const imageUrl =
      Store.product != null
        ? Store.product.images[0].largeSizeUrl
        : "https://img.rezdy.com/PRODUCT_IMAGE/194530/1788390_lg.jpg";

    const description =
      Store.product != null
        ? Store.product.description
        : "Planning to visit our Pavilion? Go ahead and book one of our scheduled tours that will enable you to truly experience what the Kingdom of Saudi Arabia has to offer.<br />Each tour is for 20 mins where one of our experienced guides will take you";

    return (
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="col-auto md:col-span-8 px-4 py-2 prologue">
          <h1 className="text-3xl font-bold p-2">
            KSA Pavilion Tour Guide Booking
          </h1>
          <article className="bg-white p-4">
            <img className="mx-auto" src={imageUrl} alt="KSA Pavilion" />
            <p
              className="py-2"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></p>
          </article>
        </div>
        <div className="col-auto md:col-span-4 px-4 py-2 right-bar">
          <header className="p-2 font-bold bar-header">
            Start Booking Now
          </header>
          <div className="lang-selector">
            <label>
              {" "}
              <b>Select Tour Guide Language:</b>
            </label>
            <LangSelector></LangSelector>
          </div>
          <DatePicker onBookableRequest={this.onBookableRequest} />
        </div>
      </div>
    );
  }

  onBookableRequest() {
    Store.setBookingState(BookingState.Extra);
  }
}
