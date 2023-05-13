package alexman.hrms.core.network.retrofit

import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import retrofit2.Retrofit
import retrofit2.converter.moshi.MoshiConverterFactory

object HrmsRetrofitInstance {

    // TODO("add back `api/` for prod")
    private const val baseUrl = "http://localhost:8000/" /* api/" */

    private val moshi = Moshi.Builder()
        .add(KotlinJsonAdapterFactory())
        .build()

    val api: HrmsApi by lazy {
        Retrofit.Builder()
            .baseUrl(baseUrl)
            .addConverterFactory(MoshiConverterFactory.create(moshi))
            .build()
            .create(HrmsApi::class.java)
    }
}
