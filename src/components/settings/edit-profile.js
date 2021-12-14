import { useEffect } from "react"
/* Material UI*/
import '../../styles/material.css'
import { MDCTextField } from '@material/textfield';



const EditProfile = ({
    handleCloseModal,
    profile: {
        Age,
        Height,
        Weight,
        Country,
        AboutMe,
        Gender,
        Language,
        BodyType,
        fullName,
        following = [],
        followers = [],
        sxpreference,
        docId: profileDocId,
        userId: profileUserId,
        username: profileUsername
    }
}) => {
    useEffect(() => {
        document.title = 'Edit Profile - Upluxure'
    }, [])



    return (
        <>
            <form class="container ">
                <div class="flex flex-wrap -mx-3 mb-3">
                    <div class="w-full px-3">
                        <p class="text-red-500 text-lg font-bold">Profile Information</p>
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-1">
                    <div class="w-full px-3">
                        <label class=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                           Profile Picture
                        </label>
                        <input class="appearance-none  w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane Lewis"
                            minLength="4" maxLength="30"
                        />
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-3 ">
                    <div class="w-full px-3">
                        <label class=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            About me
                        </label>
                        <textarea class="appearance-none  w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder=""
                            minLength="4" maxLength="200"
                        />
                        <p class="text-red-500 text-xs italic">Write a short description</p>
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-1 ">
                    <div class="w-full px-3">
                        <label class=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Language
                        </label>
                        <input class="appearance-none  w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="English, Spanish, Etc"
                            minLength="4" maxLength="10"
                        />
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-4">
                    <div class="w-full px-3">
                        <label class=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 " for="grid-state">
                            Body Type
                        </label>
                        <div class="relative">
                            <select class=" appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option>No Answer</option>
                                <option>Average</option>
                                <option>Slim/Petite</option>
                                <option>Athletic</option>
                                <option>Muscular</option>
                                <option>Ample</option>
                                <option>Athletic</option>
                                <option>Little in the middle</option>
                                <option>Large</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 " for="grid-state">
                            Country
                        </label>
                        <div class="relative">
                            <select class=" appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option>No Answer</option>
                                <option>Argentina</option>
                                <option>Bolivia</option>
                                <option>Brasil</option>
                                <option>Cuba</option>
                                <option>Chile</option>
                                <option>Canada</option>
                                <option>Colombia</option>
                                <option>Costa Rica</option>
                                <option>Ecuador</option>
                                <option>El Salvador</option>
                                <option>Guyana</option>
                                <option>Paraguay</option>
                                <option>Perú</option>
                                <option>Suriname</option>
                                <option>Uruguay</option>
                                <option>United Stated</option>
                                <option>Venezuela</option>
                                <option>Other</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 " for="grid-state">
                            Gender
                        </label>
                        <div class="relative">
                            <select class=" appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option>No Answer</option>
                                <option>Argentina</option>
                                <option>Bolivia</option>
                                <option>Brasil</option>
                                <option>Cuba</option>
                                <option>Chile</option>
                                <option>Canada</option>
                                <option>Colombia</option>
                                <option>Costa Rica</option>
                                <option>Ecuador</option>
                                <option>El Salvador</option>
                                <option>Guyana</option>
                                <option>Paraguay</option>
                                <option>Perú</option>
                                <option>Suriname</option>
                                <option>Uruguay</option>
                                <option>United Stated</option>
                                <option>Venezuela</option>
                                <option>Other</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 " for="grid-state">
                            Sexual Preference
                        </label>
                        <div class="relative">
                            <select class=" appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                <option>No Answer</option>
                                <option>Gay</option>
                                <option>Straight</option>
                                <option>Bisexual</option>
                                <option>Bi-curious</option>
                                <option>Transgender</option>
                                <option>Other</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                        <label class=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Hobby #1
                        </label>
                        <input class="appearance-none  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Travel" />
                    </div>
                    <div class="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                        <label class=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Hobby #2
                        </label>
                        <input class="appearance-none  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Shopping" />
                    </div>
                    <div class="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                        <label class=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Hobby #3
                        </label>
                        <input class="appearance-none  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Food" />
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                        <label class=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Age
                        </label>
                        <input class="appearance-none  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="26" min="18" />
                    </div>
                    <div class="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                        <label class=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Height
                        </label>
                        <input class="appearance-none  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="CM" min="0" />
                    </div>
                    <div class="w-full md:w-1/3 px-2 mb-6 md:mb-0">
                        <label class=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                            Weight
                        </label>
                        <input class="appearance-none  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number" placeholder="KG" min="0" />
                    </div>
                </div>

                <div class="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full px-3 mb-3 mt-3 flex flex-row items-center justify-around">
                        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            onClick={(e) => {
                                e.preventDefault()
                                handleCloseModal()
                            }}
                        >
                            Cancel
                        </button>
                        <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                            onClick={(e) => {
                                e.preventDefault()
                            }}
                        >
                            Button
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditProfile
