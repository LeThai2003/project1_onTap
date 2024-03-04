//pagination
const paginationButton = document.querySelectorAll("[button-number]");
paginationButton.forEach(button => {
    let url = new URL(window.location.href);
    button.addEventListener("click", () => {
        const page = button.getAttribute("button-number");
        url.searchParams.set("page", page);
        window.location.href = url.href;
    });
});
//end pagination

//filter status
const buttonStatus = document.querySelectorAll("[status]");
if(buttonStatus.length > 0)
{
    buttonStatus.forEach(button => {
        let url = new URL(window.location.href);

        button.addEventListener("click", () => {
            const status = button.getAttribute("status");
            if(status)
            {
                url.searchParams.set("status", status);
            }
            else
            {
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
        });
    });
}
//filter status

//search form
const formSearch = document.querySelector("[formSearch]");
if(formSearch)
{
    formSearch.addEventListener("submit", (e) => {
        let url = new URL(window.location.href);

        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if(keyword)
        {
            url.searchParams.set("keyword", keyword);
        }
        else
        {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
    });
}
//search form

//change-status
const buttonChange = document.querySelectorAll("[change-status]");
if(buttonChange.length > 0)
{
    const formChangeStatus = document.querySelector("[formChangeStatus]");
    const path = formChangeStatus.getAttribute("path");
    buttonChange.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("status");
            const changeStatus = (status == "active" ? "inactive" : "active");
            const id = button.getAttribute("data-id");

            const action = `${path}/${changeStatus}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit();
        });
    });
}
//change-status

//change-multi
const boxChangeMulti = document.querySelector("[box-check]");
if(boxChangeMulti)
{
    const checkAll = boxChangeMulti.querySelector("input[name='checkAll']");
    const inputsCheck = boxChangeMulti.querySelectorAll("input[name='id']");
    
    checkAll.addEventListener("click", () => {
        if(checkAll.checked)
        {
            inputsCheck.forEach(input => {
                input.checked = true;
            });
        }
        else
        {
            inputsCheck.forEach(input => {
                input.checked = false;
            });
        }
    });

    inputsCheck.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = boxChangeMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked == inputsCheck.length)
            {
                checkAll.checked = true;
            }
            else
            {
                checkAll.checked = false;
            }
        });
    });
}
//change-multi

//form change multi
const formChangeMulti = document.querySelector("[formChangeMulti]");
if(formChangeMulti)
{
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const type = e.target.elements.type.value;
        if(type == "deleteAll")
        {
            const confirmDelete = confirm("Bạn có muốn xóa những sản phẩm đã chọn không");
            if(!confirmDelete)
            {
                return;
            }
        }
        const inputsCheck = boxChangeMulti.querySelectorAll("input[name='id']:checked");
        if(inputsCheck.length > 0)
        {
            const inputIds = document.querySelector("input[name='ids']");
            const ids = [];
            inputsCheck.forEach(input => {
                const id = input.getAttribute("data-id");
                if(type=="change-position")
                {
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`);
                }
                else
                {
                    ids.push(id);
                }
            });
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        }
        else
        {
            alert("Bạn chưa chọn sản phẩm nào");
        }
    });
}
//form change multi

//delete-one
const buttonDelete = document.querySelectorAll("[button-delete]");
const formDeleteOne = document.querySelector("[formDeleteOne]");
if(buttonDelete.length > 0)
{
    const path = formDeleteOne.getAttribute("path");
    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const confirmDelete = confirm("Bạn có muốn xóa sản phẩm này không?");
            if(confirmDelete)
            {
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=PATCH`;
                formDeleteOne.action = action;
                formDeleteOne.submit();
            }
            else
            {
                return;
            }
        });
    });
}
//delete-one


// alert
const alert = document.querySelector("[show-alert]");
if(alert)
{
    const time = parseInt(alert.getAttribute("data-time"));
    setTimeout(() => {
        alert.classList.add("hidden-alert");
    }, time);
}

// close alert
const closeAlert = document.querySelector("[close-alert]");
if(closeAlert)
{
    closeAlert.addEventListener("click", () => {
        alert.classList.add("hidden-alert");
    });
}
//end alert

//preview image upload
const imagePreview = document.querySelector("[image-preview]");
if(imagePreview)
{
    const imagePreviewInput = imagePreview.querySelector("[image-preview-input]");
    const imagePreViewSee = imagePreview.querySelector("[image-preview-see]");
    imagePreviewInput.addEventListener("change", () => {
        const [file] = imagePreviewInput.files; 
        if(file)
        {
            imagePreViewSee.src = URL.createObjectURL(file);
        }
    });
}
//preview image upload

//sort select option
const sort = document.querySelector("[sort]");
if(sort)
{
    const sortSelection = sort.querySelector("[sort-select]");
    const url = new URL(window.location.href);
    sortSelection.addEventListener("change", () => {
        let [sortKey, sortValue] = sortSelection.value.split("-");
        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);

        window.location.href = url.href;
    });

    // clear button
    const buttonClear = sort.querySelector("[sort-clear]");
    buttonClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");

        window.location.href = url.href;
    });

    // selection
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");

    if(sortKey && sortValue)
    {
        const stringValue = `${sortKey}-${sortValue}`;
        const itemSelect = sortSelection.querySelector(`option[value="${stringValue}"]`);
        itemSelect.selected = true;
    }
}
//sort select option

//----permission---
const tablePermission = document.querySelector("[table-permission]");
if(tablePermission)
{
    const buttonSubmit = document.querySelector("[button-submit]");
    buttonSubmit.addEventListener("click", () => {
        const roles = [];   
        const rows = tablePermission.querySelectorAll("[data-name]");
        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input"); // qua moi hang thi lay cac input cua hang do
            if(name == "id") // neu la hang dau tien id
            {
                inputs.forEach(input => {
                    const id = input.value;
                    roles.push({
                        id: id,
                        permissions: []
                    });
                });
            }
            else // các hàng tiếp theo-> input(checkbox).. nếu input ở vị trí index nào chẹcked thì push vào roles
            {
                inputs.forEach((input, index) => {
                    if(input.checked)
                    {
                        roles[index].permissions.push(name);
                    }
                });
            }
        });
        const formChangePermissions = document.querySelector("[form-change-permissions]");
        const inputPermissions = formChangePermissions.querySelector("input[name='roles']");
        inputPermissions.value = JSON.stringify(roles); 
        formChangePermissions.submit();
    });

    // default value 
    const divData = document.querySelector("[divData]");
    if(divData)
    {
        const datas = JSON.parse(divData.getAttribute("divData"))  // mảng roles -> lấy từng record
        datas.forEach((data, index) => {
            const permissions = data.permissions;  // trong từng record -> lấy mảng permissions
            permissions.forEach(permission => {  // trong mảng permissions -> lấy ra từng quyền 
                const row = tablePermission.querySelector(`[data-name='${permission}']`); // tìm tới row quyền đó
                const inputs = row.querySelectorAll("input");
                console.log(inputs);
                inputs[index].checked = true;  // chắc chắn input checkbox sẽ checked = true theo index
            })
        });
    }

}
//----end permission---

