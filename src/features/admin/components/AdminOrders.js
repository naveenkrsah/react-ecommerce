import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrder,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import {
  PencilIcon,
  EyeIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const [editableItemId, setEditableItemId] = useState(-1);
  const [sort, setSort] = useState({});
  const dispatch = useDispatch();
  const orders = useSelector(selectOrder);
  const totalOrders = useSelector(selectTotalOrders);

  const handlePage = (page) => {
    setPage(page);
  };

  const handleEdit = (order) => {
    setEditableItemId(order.id);
  };
  const handleShow = () => {};

  const handleStatus = (e, order) => {
    const updateOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrder));
    setEditableItemId(-1);
  };

  function handleSort(sortOption) {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log(sort);
    setSort(sort);
  }

  useEffect(() => { 
    const Pagination = { _page: page, _limit: ITEMS_PER_PAGE }; 
    dispatch(fetchAllOrdersAsync({ sort, Pagination }));
  }, [dispatch, page, sort]);

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-400 text-white";
      case "delivered":
        return "bg-green-400 text-white";
      case "cancelled":
        return "bg-red-400 text-white";
    }
  };

  return (
    <>
      {/* component */}
      <div className="overflow-x-auto">
        <div className="bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded ">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order#{" "}
                      {sort._sort === "id" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                        ))}
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th
                      className="py-3 px-6 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "totalAmount",
                          order: sort._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Total Amount{" "}
                      {sort._sort === "totalAmount" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                        ))}
                    </th>
                    <th className="py-3 px-6 text-center">ShippingAddress</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.items.map((item) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.product.thumbnail}
                                alt={item.product.title}
                              />
                            </div>
                            <span>
                              {item.product.title}-#{item.quantity}-$
                              {discountedPrice(item.product)}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <span>${order.totalAmount}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.selectedAdress ? (
                          <div className="flex-col items-center justify-center">
                            <div>
                              <strong>{order.selectedAdress.name}</strong>
                            </div>
                            <div>{order.selectedAdress.email}</div>
                            <div>{order.selectedAdress.phone}</div>
                            <div>{order.selectedAdress.street}</div>
                            <div>{order.selectedAdress.city}</div>
                            <div>{order.selectedAdress.state}</div>
                            <div>{order.selectedAdress.pinCode}</div>
                          </div>
                        ) : (
                          ""
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        {editableItemId === order.id ? (
                          <select onChange={(e) => handleStatus(e, order)}>
                            <option value="">--select==</option>
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-4 transform hover:text-purple-500 hover:scale-110">
                            <EyeIcon
                              className="w-8 h-6"
                              onClick={(e) => handleShow(order)}
                            ></EyeIcon>
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon
                              className="w-8 h-6"
                              onClick={(e) => handleEdit(order)}
                            ></PencilIcon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalOrders}
        ></Pagination>
      </div>
    </>
  );
}

export default AdminOrders;
