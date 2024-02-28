const loadData = async () => {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/ai/tools"
    );
    const data = await response.json();
    const tools = data.data.tools;
    displayData(tools);
  } catch (error) {
    console.error("Error!");
  }
};

const displayData = (tools) => {
  const content = document.querySelector(".content");
  tools.forEach((tool) => {
    const div = document.createElement("div");
    div.classList.add(
      "p-2",
      "rounded",
      "border",
      "border-[#111]",
      "border-opacity-50"
    );
    div.innerHTML = `
        <img src="${
          tool.image
            ? tool.image
            : "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
        }" alt="Image" class="rounded">
        <h2 class="my-2 font-bold text-xl">Features</h2>
        
        <ul class="mb-2">
        ${tool.features
          .map(
            (feature, index) =>
              `<li class="text-base"><span>${index + 1}</span> ${feature}</li>`
          )
          .join("")}
        </ul>
        <div class="pb-2 border-b mb-2"></div>
        <div class="flex justify-between items-center">
            <div>
                <h2 class="font-bold text-xl text-black mb-2">${tool.name}</h2>
                <p>${tool.published_in}</p>
            </div>
            <div>
                <button class="py-2 px-3 bg-black rounded text-white font-semibold text-lg" onclick="detailHandler('${
                  tool.id
                }')">
                    Details
                </button>
            </div>
        </div>
        `;
    content.appendChild(div);
  });
};

const detailHandler = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const data = await response.json();
  const tool = data.data;
  showDetails(tool);
};

const showDetails = (tool) => {
  const detailsContent = document.querySelector(".details-content");
  detailsContent.innerHTML = `
        <img src="${
          tool.image_link[0]
            ? tool.image_link[0]
            : "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
        }" class="rounded mt-5 w-1/2 mx-auto">
        <p class="mt-2">${tool.tool_name ? tool.tool_name : "No data Found"}</p>
        <p class="mt-2">${
          tool.description ? tool.description : "No data Found"
        }</p>
        <a class="mt-2 inline-block" href="${
          tool.website ? tool.website : "No data Found"
        }">
            Website
        </a>
        <p class="mt-2">${
          tool.accuracy.score ? tool.accuracy.score : "No data Found"
        }% accuracy</p>
        <p class="mt-2">${
          tool.accuracy.description
            ? tool.accuracy.description
            : "No data Found"
        }</p>
        <p class="mt-2">
            ${
              tool.input_output_examples[0].input
                ? tool.input_output_examples[0].input
                : "No data Found"
            }
        </p>
        <p class="mt-2">
            ${
              tool.input_output_examples[0].output
                ? tool.input_output_examples[0].output
                : "No data Found"
            }
        </p>
        <p class="mt-2">
            ${
              tool.input_output_examples[1].input
                ? tool.input_output_examples[1].input
                : "No data Found"
            }
        </p>
        <p class="mt-2">
            ${
              tool.input_output_examples[1].output
                ? tool.input_output_examples[1].output
                : "No data Found"
            }
        </p>
        <h2>Features : </h2>
        ${tool.features ? Object.entries(tool.features).map(([key, value]) => `<li>${value.feature_name}</li> <p>${value.description}</p>`).join('') : 'No Data Found!'}   
        <h2>Integrations - </h2>
        ${
          tool.integrations
            ? tool.integrations
                .map(
                  (integration) => `<li class="text-base">${integration}</li>`
                )
                .join("")
            : "No Data Found!"
        }
        ${
          tool.use_cases
            ? tool.use_cases
                .map(
                  (use_case) => `
            <p>${use_case["name"]}</p>
            <p>${use_case["description"]}</p>
        `
                )
                .join("")
            : "No Data Found!"
        }
        ${
          tool.pricing
            ? tool.pricing
                .map(
                  (singlePricing) => `
        <p>${singlePricing["plan"]}</p>
        <p>${singlePricing["price"]}</p>
    `
                )
                .join("")
            : "No Data Found!"
        }
    `;
  modal.showModal();
};

loadData();
