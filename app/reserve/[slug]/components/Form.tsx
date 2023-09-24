"use client";

import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import useReservation from "../../../../hooks/useReservation";

const Form = ({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) => {
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOccasion: "",
    bookerRequest: "",
  });

  const [day, time] = date.split("T");

  const [disabled, setDisabled] = useState(true);
  const [didBook, setDidBook] = useState(false);

  const { error, loading, createReservation } = useReservation();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      partySize,
      time,
      day,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerEmail: inputs.bookerEmail,
      bookerPhone: inputs.bookerPhone,
      bookerOccasion: inputs.bookerOccasion,
      bookerRequest: inputs.bookerRequest,
      setDidBook,
    });

    return booking;
  };

  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerPhone &&
      inputs.bookerEmail
    ) {
      return setDisabled(false);
    }

    return setDisabled(true);
  }, [inputs]);

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ? (
        <div>
          <h1>You are all booked up</h1>
          <p>Enjoy your reservation</p>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            value={inputs.bookerFirstName}
            onChange={handleChangeInput}
            placeholder="First name"
            name="bookerFirstName"
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            value={inputs.bookerLastName}
            onChange={handleChangeInput}
            placeholder="Last name"
            name="bookerLastName"
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            value={inputs.bookerPhone}
            onChange={handleChangeInput}
            placeholder="Phone number"
            name="bookerPhone"
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            value={inputs.bookerEmail}
            onChange={handleChangeInput}
            placeholder="Email"
            name="bookerEmail"
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            value={inputs.bookerOccasion}
            onChange={handleChangeInput}
            placeholder="Occasion (optional)"
            name="bookerOccasion"
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            value={inputs.bookerRequest}
            onChange={handleChangeInput}
            placeholder="Requests (optional)"
            name="bookerRequest"
          />
          <button
            disabled={disabled || loading}
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            onClick={handleClick}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Complete reservation"
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
};

export default Form;
