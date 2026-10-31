let members = [
  { memberCode: "GYM-001", fullName: "Hoàng Văn Nam", packageName: "Gói Cơ Bản", age: 22, monthCount: 3 },
  { memberCode: "GYM-002", fullName: "Lý Thị Mai", packageName: "Gói Yoga", age: 30, monthCount: 6 },
  { memberCode: "GYM-003", fullName: "Bùi Đức Anh", packageName: "Gói Thể Hình Nâng Cao", age: 27, monthCount: 12 }
];

function validateMemberCode(code) {
  if (code === "") {
    return "Chưa nhập mã hội viên";
  }
  if (code.length < 6) {
    return "Độ dài nhỏ hơn 6 ký tự";
  }
  if (!code.startsWith("GYM-")) {
    return 'Sai tiền tố "GYM-"';
  }
  if (code.includes(" ")) {
    return "Chứa khoảng trắng";
  }
  if (findMemberIndex(code) !== -1) {
    return "Mã hội viên đã tồn tại";
  }
  return "";
}

function findMemberIndex(code) {
  for (let i = 0; i < members.length; i++) {
    if (members[i].memberCode === code) {
      return i;
    }
  }
  return -1;
}

function normalizeText(rawText) {
  if (!rawText) {
    return "";
  }
  let words = rawText.trim().split(" ");
  let cleanWords = [];
  for (let i = 0; i < words.length; i++) {
    let word = words[i].trim();
    if (word !== "") {
      let capitalized = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      cleanWords.push(capitalized);
    }
  }
  return cleanWords.join(" ");
}


function inputIntegerInRange(message, min, max) {
  while (true) {
    let input = prompt(message);
    if (input === null) {
      return null;
    }
    let trimmed = input.trim();
    if (trimmed === "") {
      console.log("Lỗi: chưa nhập, nhập lại");
      continue;
    }
    let num = Number(trimmed);
    if (isNaN(num) || num % 1 !== 0) {
      console.log("Lỗi: không phải số nguyên, nhập lại");
      continue;
    }
    if (num < min || num > max) {
      console.log(`Lỗi: ngoài phạm vi ${min} – ${max}, nhập lại`);
      continue;
    }
    return num;
  }
}

function displayMembers(list) {
  if (list.length === 0) {
    console.log("Danh sách hội viên trống");
    return;
  }
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    console.log(`${i + 1}. ${item.memberCode} - ${item.fullName} - ${item.packageName}`);
    console.log(`   Tuổi: ${item.age} | Số tháng đăng ký: ${item.monthCount}`);
  }
  console.log(`Tổng: ${list.length} hội viên`);
}


function handleDisplayMembers() {
  displayMembers(members);
}

function handleAddMember() {
  let codeInput = prompt("Nhập mã hội viên (ví dụ: GYM-004):");
  if (codeInput === null) {
    console.log("Hủy thao tác thêm");
    return;
  }

  let code = codeInput.trim().toUpperCase();
  let errorCode = validateMemberCode(code);
  if (errorCode !== "") {
    console.log("Lỗi: " + errorCode);
    return;
  }

  let fullName = "";
  while (true) {
    let nameInput = prompt("Nhập họ tên hội viên:");
    if (nameInput === null) {
      console.log("Hủy thao tác thêm");
      return;
    }
    if (nameInput.trim() !== "") {
      fullName = normalizeText(nameInput);
      break;
    }
    console.log("Họ tên không được để trống, vui lòng nhập lại");
  }

  let packageName = "";
  while (true) {
    let packageInput = prompt("Nhập tên gói tập:");
    if (packageInput === null) {
      console.log("Hủy thao tác thêm");
      return;
    }
    if (packageInput.trim() !== "") {
      packageName = normalizeText(packageInput);
      break;
    }
    console.log("Gói tập không được để trống, vui lòng nhập lại");
  }

  let age = inputIntegerInRange("Nhập tuổi hội viên (16 - 70):", 16, 70);
  if (age === null) {
    console.log("Hủy thao tác thêm");
    return;
  }

  let monthCount = inputIntegerInRange("Nhập số tháng đăng ký (1 - 24):", 1, 24);
  if (monthCount === null) {
    console.log("Hủy thao tác thêm");
    return;
  }

  let newMember = {
    memberCode: code,
    fullName: fullName,
    packageName: packageName,
    age: age,
    monthCount: monthCount
  };

  members.push(newMember);
  console.log("Thêm hội viên thành công:");
  console.log(`Mã hội viên: ${newMember.memberCode}`);
  console.log(`Họ tên: ${newMember.fullName}`);
  console.log(`Gói tập: ${newMember.packageName}`);
  console.log(`Tuổi: ${newMember.age}`);
  console.log(`Số tháng đăng ký: ${newMember.monthCount}`);
}


function handleUpdateMember() {
  let codeInput = prompt("Nhập mã hội viên cần cập nhật:");
  if (codeInput === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  let code = codeInput.trim().toUpperCase();
  let index = findMemberIndex(code);
  if (index === -1) {
    console.log(`Không tìm thấy hội viên có mã ${code}`);
    return;
  }

  let newAge = inputIntegerInRange("Nhập tuổi mới (16 - 70):", 16, 70);
  if (newAge === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  let newMonthCount = inputIntegerInRange("Nhập số tháng đăng ký mới (1 - 24):", 1, 24);
  if (newMonthCount === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  let oldAge = members[index].age;
  let oldMonthCount = members[index].monthCount;
  members[index].age = newAge;
  members[index].monthCount = newMonthCount;
  console.log(`Cập nhật thành công hội viên ${code}`);
  console.log(`Trước: Tuổi: ${oldAge} / Số tháng đăng ký: ${oldMonthCount}`);
  console.log(`Sau: Tuổi: ${newAge} / Số tháng đăng ký: ${newMonthCount}`);
}


let choice = 0;
do {
  console.log("=====================================================");
  console.log("     HỆ THỐNG QUẢN LÝ HỘI VIÊN PHÒNG TẬP FITZONE     ");
  console.log("=====================================================");
  console.log("1. Hiển thị danh sách hội viên");
  console.log("2. Thêm hội viên mới");
  console.log("3. Cập nhật thông tin hội viên");
  console.log("4. Xóa hội viên");
  console.log("5. Tìm kiếm hội viên theo gói tập");
  console.log("0. Thoát chương trình");
  console.log("=====================================================");

  let choiceInput = prompt("Vui lòng nhập lựa chọn của bạn (0 - 5):");
  if (choiceInput === null) {
    console.log("Lựa chọn không hợp lệ");
    continue;
  }

  let choiceString = choiceInput.trim();
  choice = Number(choiceString);
  if (choiceString === "" || isNaN(choice) || choice < 0 || choice > 5 || choice % 1 !== 0) {
    console.log("Lựa chọn không hợp lệ");
    continue;
  }

  switch (choice) {
    case 1: {
      handleDisplayMembers();
      break;
    }
    case 2: {
      handleAddMember();
      break;
    }
    case 3: {
      handleUpdateMember();
      break;
    }
    case 4: {
      break;
    }
    case 5: {
      break;
    }
    case 0: {
      console.log("Thoát chương trình");
      break;
    }
    default: {
      console.log("Lựa chọn không hợp lệ");
      break;
    }
  }
} while (choice !== 0);
