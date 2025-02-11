import React from 'react';
import Image from 'next/image';
import closeIcon from '../../public/images/close.png';

const SingleConfirmationModal = ({ form, onConfirm, onCancel, oncClose }) => {
  console.log('SingleConfirmationModal props:', {
    form,
    onConfirm,
    onCancel,
    oncClose,
  });

  // Ensure the modal is being rendered
  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed font-poppins inset-0 bg-gray-500 bg-opacity-5 flex justify-center items-center z-10">
      <div className="bg-white px-14 pt-6 rounded-xl w-[39%] h-[calc(100vh*0.87)] flex flex-col relative">
        <button className="absolute top-3 right-3" onClick={oncClose}>
          <Image src={closeIcon} alt="Close Modal" width={30} height={30} />
        </button>
        <h2 className="text-4xl font-semibold text-center mb-2 mt-16">
          You’ve Set
        </h2>

        <h2 className="text-4xl font-semibold text-center mb-4">
          Tuma Markup as follows:
        </h2>
        <ul className="text-center mt-8 mb-4">
          <li>
            <span className="font-semibold  text-xl">{form.baseCurrency}</span>{' '}
            →{' '}
            <span className="font-semibold text-xl">
              {form.destinationCurrency}
            </span>
          </li>
          <li className="my-2">
            <span className="mr-3 text-xl font-semibold">By:</span>{' '}
            <span className="text-xl text-gray-600">{form.markup}%</span>
          </li>
          <li className="text-xl">
            <span className="mr-3 font-semibold text-xl">Date of Effect:</span>
            <span className="text-gray-600">
              {form.dateOfEffect
                ? new Date(form.dateOfEffect).toLocaleDateString()
                : 'N/A'}
            </span>
          </li>
        </ul>
        <p className="text-center text-[#808A92] px-16 text-2xl mt-14 mb-16">
          Confirm you want to proceed with applying these rates to the
          destination currency?
        </p>
        <div className="flex justify-between px-12">
          <button
            onClick={onCancel}
            className="px-12 py-3 border-2 border-gray-800 tetx-lg font-semibold rounded-md hover:text-white hover:bg-gray-600"
          >
            Back
          </button>
          <button
            onClick={onConfirm}
            className="px-12 py-3 bg-gray-800 text-lg font-semibold text-white rounded-md hover:bg-gray-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleConfirmationModal;
