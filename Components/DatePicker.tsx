import { action } from 'mobx';
import React, { PureComponent } from 'react';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { Store } from '../System/Stores';
import { observer } from 'mobx-react';

interface IProps {
  onBookableRequest(): void;
}

@observer
export class DatePicker extends PureComponent<IProps> {
  constructor(props: IProps) {
    super(props);

    this.onBookNow = this.onBookNow.bind(this);
  }

  getSelectOptions() {
    let options: JSX.Element[] = [];

    for (let i = 0; i < 30; i++) {
      options.push(
        <option key={i} value={i + 1}>
          {(i + 1).toString()}
        </option>
      );
    }

    return options;
  }

  render() {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row py-2 pb-3 justify-start items-center">
          <label className="font-bold">
            Enter number of visitors:<span className="text-red-600">*</span>
          </label>
          <select
            className="border-gray-600 border-solid border h-6 ml-2 w-12"
            onChange={(data) => this.onVisitorCountSelected(data)}
          >
            {this.getSelectOptions()}
          </select>
        </div>
        <div className="flex-row font-bold">
          Choose a Preferred Date and Time
          <span className="text-red-600">*</span>
        </div>
        <div className="flex-row">
          <ReactDatePicker
            wrapperClassName="data-picker-wrapper"
            className="date-picker-wrapper"
            selected={Store.getSelectedDate()}
            onChange={(date) => this.onDateSelected(date)}
            inline
            minDate={Store.getMinDate()}
            maxDate={Store.getMaxDate()}
          />
        </div>
        <div className="flex flex-row justify-end items-center">
          <label className="mx-2 text-black font-bold">
            Preferred Time:<span className="text-red-600">*</span>
          </label>
          <div>
            <ReactDatePicker
              showTimeSelectOnly={true}
              showTimeSelect={true}
              timeFormat="HH:mm"
              timeIntervals={20}
              timeCaption="Time"
              selected={Store.getSelectedDate()}
              value={Store.getTimeComponent()}
              onChange={(date) => this.onTimeSelected(date)}
              startDate={Store.getFirstAvailableHour()}
              endDate={Store.getLastAvailableHour()}
              includeTimes={Store.getAvailableHours()}
            />
          </div>
        </div>
        <div className="flex flex-row py-4 justify-center items-center">
          <button className="button book-btn w-3/4" onClick={this.onBookNow}>
            BOOK NOW
          </button>
        </div>
        <div className="flex-row">
          <span className="font-bold">Please note:</span> After your booking is
          confirmed we will send you a confirmation email.
        </div>
      </div>
    );
  }

  onDateSelected(date: Date | [Date, Date] | null) {
    if (date instanceof Date) {
      Store.setSelectedDate(date);
    }
  }

  onTimeSelected(date: Date | [Date, Date] | null) {
    if (date instanceof Date) {
      console.log('Time: ', date);
      Store.setSelectedDate(date);
    }
  }

  @action
  onVisitorCountSelected(event: React.ChangeEvent<HTMLSelectElement>) {
    let visitors = Number.parseInt(event.target.value);

    Store.setVisitorsCount(visitors);
  }

  onBookNow() {
    if (Store.getSelectedDate() != null) {
      this.props.onBookableRequest();
    }
  }
}
